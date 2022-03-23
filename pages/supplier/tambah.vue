<template>
  <div>
    <Breadcrumbs url="Supplier / Tambah" class="mb-7" />
    <!-- title -->
    <FormsTitle title="Form Tambah Supplier" />

    <!-- field name -->
    <FormsErrorMsg :msg="error.name" />
    <FormsInput
      class="mb-4"
      label="Name"
      name="name"
      v-model="name"
      placeholder="Name of medicine..."
    />

    <!-- field name -->
    <FormsErrorMsg :msg="error.image" />
    <FormsInput
      class="mb-4"
      label="Image"
      type="file"
      name="image"
      v-model="image"
      @setFile="setFile($event, 'imageField')"
    />
    <div style=""></div>
    <img v-if="src" :src="src" alt="image" class="w-32 h-32" />
    <div class="flex justify-end">
      <FormsButton @submit="submit" label="Submit" type="submit" />
    </div>
  </div>
</template>

<script>
import { fieldState } from "@/helpers/fields/supplier";
export default {
  data() {
    return {
      ...fieldState,
      error: { ...fieldState },
      imageField: "",
      src: "",
    };
  },

  methods: {
    back() {
      this.$router.back();
    },
    setFile(event, prop) {
      console.log(event.target.files[0]);
      this[prop] = event.target.files[0];
      this.src = URL.createObjectURL(event.target.files[0]);
    },
    async submit() {
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("image", this.imageField);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await this.$axios.post("/supplier", formData, config);
        this.$router.push("/supplier/list");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
