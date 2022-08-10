<template>
  <form @submit.prevent="submit">
    <Breadcrumbs url="Obat / Tambah / User" class="mb-7" />
    <!-- title -->
    <FormsTitle title="Form Tambah User" />
    <FormsErrorMsg :msg="errorAbove" class="mb-4" />
    <!-- field name -->
    <FormsErrorMsg :msg="errors.name" />
    <FormsInput
      class="mb-4"
      label="Username"
      name="Username"
      v-model="name"
      @setError="setError('name')"
      placeholder="Username..."
    />

    <FormsErrorMsg :msg="errors.email" />
    <FormsInput
      class="mb-4"
      label="Email"
      name="Email"
      v-model="email"
      @setError="setError('email')"
      placeholder="Email..."
    />
    <FormsErrorMsg :msg="errors.password" />
    <FormsInput
      class="mb-4"
      label="Password"
      name="Password"
      type="password"
      @setError="setError('password')"
      v-model="password"
      placeholder="Password..."
    />

    <!-- field type -->
    <FormsErrorMsg :msg="errors.role" />
    <FormsSingleSelect
      v-model="role"
      class="mb-4"
      @setError="setError('role')"
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
      errorAbove: "",
    };
  },

  async fetch() {
    await this.getRole();
  },

  methods: {
    setError(key) {
      this.errors[key] = "";
    },
    handleSelect(value) {
      this.role = value;
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
      const obj = this.errors;
      let arr = [];
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          arr.push(this[key]);
          if (!this[key]) {
            this.errors[key] = "This field is required.";
          }
        }
      }

      const isNotEmpty = arr.every((el) => el);
      if (isNotEmpty) {
        try {
          const { name, email, password, role } = this;
          const data = {
            name,
            email,
            password,
            role,
          };
          await this.$axios.post("/auth/register", data);
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
                console.log(key);
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
