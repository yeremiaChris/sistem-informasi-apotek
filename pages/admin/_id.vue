<template>
  <form @submit.prevent="submit">
    <Breadcrumbs url="Obat / Tambah / User" class="mb-7" />
    <!-- title -->
    <FormsTitle title="Form Tambah User" />

    <!-- field name -->
    <FormsErrorMsg :msg="errors.name" />
    <FormsInput
      class="mb-4"
      label="Username"
      name="Username"
      v-model="name"
      placeholder="Username..."
    />

    <FormsErrorMsg :msg="errors.email" />
    <FormsInput
      class="mb-4"
      label="Email"
      name="Email"
      v-model="email"
      placeholder="Email..."
    />
    <FormsErrorMsg :msg="errors.password" />
    <FormsInput
      class="mb-4"
      label="Password"
      name="Password"
      type="password"
      v-model="password"
      placeholder="Password..."
    />

    <!-- field type -->
    <FormsErrorMsg :msg="errors.role" />
    <FormsSingleSelect
      v-model="role"
      class="mb-4"
      label="Role"
      :items="roles"
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
      name: "",
      email: "",
      password: "",
      role: "",
      errors: {
        name: "",
        email: "",
        password: "",
        role: "",
      },
      roles: [],
    };
  },

  watch: {
    name() {
      this.errors.name = "";
    },
  },

  async fetch() {
    await this.getRole();
    await this.getDetail();
  },

  methods: {
    handleSelect(value) {
      this.role = value;
    },
    async getDetail() {
      try {
        const res = await this.$axios.get(
          "/role/user/" + parseInt(this.$route.params.id)
        );
        console.log(res);
        const { name, email } = res.data;
        this.name = name;
        this.email = email;
        this.role = !res.data.role ? "" : res.data.role._id;
      } catch (error) {}
    },
    async getRole() {
      try {
        const res = await this.$axios.get("/role/select-data");
        console.log(res.data);
        this.roles = res.data.map((item) => ({
          title: item.roleName,
          value: item._id,
        }));
      } catch (error) {}
    },
    async submit() {
      try {
        const { name, email, password, role } = this;
        const data = {
          name,
          email,
          password,
          role,
        };
        await this.$axios.put("/auth/register/" + this.$route.params.id, data);
        // this.$refs.formEdit.reset(); // This will clear that form
        this.$router.push("/admin/user");
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
