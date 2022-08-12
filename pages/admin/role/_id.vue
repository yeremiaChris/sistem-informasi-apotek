<template>
  <form @submit.prevent="submit">
    <Breadcrumbs url="Obat / Tambah / Role" class="mb-7" />
    <!-- title -->
    <FormsTitle title="Form Tambah Role" />

    <!-- field name -->
    <FormsErrorMsg :msg="errors.roleName" />
    <FormsInput
      class="mb-4"
      label="Title"
      name="title"
      v-model="roleName"
      placeholder="Title..."
    />

    <div>
      <p class="my-4 block text-sm font-medium text-gray-700">Menus</p>
      <FormsErrorMsg :msg="errors.menus" />
      <div
        class="grid my-4 grid-cols-2 justify-between text-sm"
        v-for="(menu, index) in menus"
        :key="index + 'menus'"
      >
        <p>{{ menu.menuName }}</p>
        <FormsToggle
          :showLabel="false"
          @toggle="toggleMenus(menu.menuName)"
          :value="menu.isPermitted"
        />
      </div>
    </div>

    <!-- button submit -->
    <div class="flex justify-end gap-3">
      <FormsButton label="Submit" type="submit" />
    </div>
  </form>
</template>

<script>
import menus from "@/helpers/fields/role";
export default {
  data() {
    return {
      roleName: "",
      errors: {
        roleName: "",
        menus: "",
      },
      menus,
    };
  },

  watch: {
    roleName() {
      this.errors.roleName = "";
    },
  },

  async fetch() {
    await this.getData();
  },

  methods: {
    async getData() {
      try {
        const res = await this.$axios.get("/role/" + this.$route.params.id);
        const { roleName, menus } = res.data;
        this.roleName = roleName;

        this.menus = menus;
      } catch (error) {}
    },
    toggleMenus(name) {
      this.menus = this.menus.map((item) =>
        item.menuName === name
          ? { ...item, isPermitted: !item.isPermitted }
          : item
      );
      this.errors.menus = "";
    },
    async submit() {
      if (!this.roleName || this.menus.every((el) => !el.isPermitted)) {
        if (!this.roleName) {
          this.errors.roleName = "Field ini harus diisi";
        }
        if (this.menus.every((el) => !el.isPermitted)) {
          this.errors.menus = "Field ini harus diisi";
        }
      } else {
        try {
          const { roleName, menus } = this;
          const data = {
            roleName,
            menus,
          };
          await this.$axios.put("/role/" + this.$route.params.id, data);
          // this.$refs.formEdit.reset(); // This will clear that form
          this.$router.push("/admin/role");
          const payload2 = {
            value: true,
            props: "success",
          };
          this.$store.commit("setProps", payload2);
        } catch (error) {
          if (error.response.data.errors) {
            const obj = error.response.data.errors;
            console.log(obj);

            for (const key in obj) {
              if (Object.hasOwnProperty.call(obj, key)) {
                this.errors = { ...this.errors, [key]: obj[key].message };
              }
            }
          }
        }
      }
    },
    back() {
      this.$router.back();
    },
  },
};
</script>
