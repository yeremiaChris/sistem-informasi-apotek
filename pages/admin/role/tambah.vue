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

    <!-- button submit -->
    <div class="flex justify-end gap-3">
      <FormsButton
        @submit="back"
        className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
        label="Back"
        type="button"
      />
      <FormsButton label="Submit" type="submit" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      roleName: "",
      errors: {
        roleName: "",
      },
    };
  },

  watch: {
    roleName() {
      this.errors.roleName = "";
    },
  },

  methods: {
    async submit() {
      try {
        const { roleName } = this;
        const data = {
          roleName,
        };
        await this.$axios.post("/role", data);
        // this.$refs.formEdit.reset(); // This will clear that form
        this.$router.push("/obat/jenis");
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
    },
    back() {
      this.$router.back();
    },
  },
};
</script>
