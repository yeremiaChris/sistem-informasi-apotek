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
      this[prop] = event.target.files;
      this.src = URL.createObjectURL(event.target.files[0]);
    },
  },
};
</script>
