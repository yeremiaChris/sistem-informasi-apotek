<template>
  <form @submit.prevent="submit">
    <Breadcrumbs url="Obat / Tambah / Satuan" class="mb-7" />
    <!-- title -->
    <FormsTitle title="Form Tambah Satuan obat" />
    <FormsErrorMsg :msg="errorAbove" class="mb-4" />
    <!-- field name -->
    <FormsErrorMsg :msg="errors.title" />
    <FormsInput
      class="mb-4"
      label="Title"
      name="title"
      v-model="title"
      placeholder="Title..."
    />

    <FormsErrorMsg :msg="errors.description" />
    <FormsInput
      class="mb-4"
      label="Description"
      name="description"
      v-model="description"
      placeholder="Description..."
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
      title: "",
      description: "",
      errors: {
        title: "",
        description: "",
      },
      errorAbove: "",
    };
  },

  mounted() {
    this.$store.commit("obat/emptyField");
  },

  watch: {
    title() {
      this.errors.title = "";
    },
    description() {
      this.errors.description = "";
    },
  },

  methods: {
    async submit() {
      const obj = this.errors;
      let arr = [];
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          arr.push({ name: key, value: this[key] });
          if (!this[key]) {
            this.errors[key] = "Field ini harus diisi.";
          }
        }
      }

      const isNotEmpty = arr.every((el) => el.value);

      if (isNotEmpty) {
        try {
          const { title, description } = this;
          const data = {
            title,
            description,
          };
          await this.$axios.post("/medicine/satuan", data);
          // this.$refs.formEdit.reset(); // This will clear that form
          this.$router.push("/obat/satuan");
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

          if (error.response.data.message) {
            this.errorAbove = error.response.data.message;
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
