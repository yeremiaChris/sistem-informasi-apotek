<template>
  <div>
    <Breadcrumbs url="Supplier / Tambah" class="mb-7" />
    <!-- title -->
    <FormsTitle title="Form Tambah Supplier" />
    <FormsErrorMsg :msg="errorAbove" class="mb-4" />
    <!-- field name -->
    <FormsErrorMsg :msg="error.name" />
    <FormsInput
      class="mb-4"
      @setError="setError('name')"
      label="Nama supplier"
      name="name"
      v-model="name"
      placeholder="Nama supplier..."
    />

    <!-- field name -->
    <FormsErrorMsg :msg="error.imageField" />
    <FormsInput
      class="mb-4"
      label="Gambar icon"
      type="file"
      name="image"
      @setError="setError('imageField')"
      v-model="image"
      @setFile="setFile($event, 'imageField')"
    />
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
      errorAbove: "",
      image: "",
    };
  },

  async fetch() {
    await this.fetchData();
  },

  methods: {
    setError(key) {
      this.error[key] = "";
    },
    async fetchData() {
      try {
        const res = await this.$axios.get("/supplier/" + this.$route.params.id);
        const object = res.data;
        this.imageField = object.media;
        this.src = this.$config.imageURL + object.media.defaultImage;
        // this.image = this.$config.imageURL + object.media.defaultImage;
        this.name = object.name;

        // for (const property in object) {
        //   if (property === "media") {
        //     this.imageField = object[property];
        //     this.src = this.$config.imageURL + object[property].defaultImage;
        //     this.image = this.$config.imageURL + object[property].defaultImage;
        //   } else if (property === "name") {
        //     this[property] = object[property];
        //   }
        // }
      } catch (error) {}
    },

    back() {
      this.$router.back();
    },

    setFile(event, prop) {
      this[prop] = event.target.files[0];
      this.src = URL.createObjectURL(event.target.files[0]);
    },

    async submit() {
      const object = this.error;
      let arr = [];
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          arr.push({ name: key, value: this[key] });
          if (!this[key]) {
            this.error[key] = "Field ini harus diisi.";
          }
        }
      }

      const isNotEmpty = arr.every((el) => el.value);

      if (isNotEmpty) {
        try {
          const formData = new FormData();
          formData.append("name", this.name);
          formData.append("image", this.imageField);
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          await this.$axios.put(
            "/supplier/" + this.$route.params.id,
            formData,
            config
          );
          const payload2 = {
            value: true,
            props: "success",
          };
          this.$store.commit("setProps", payload2);
          setTimeout(() => {
            const payload3 = {
              value: false,
              props: "success",
            };
            this.$store.commit("setProps", payload3);
          }, 3000);
          this.$router.push("/supplier/list");
        } catch (error) {
          if (error.response.data.message) {
            this.errorAbove = error.response.data.message;
          }
        }
      }
    },
  },
};
</script>
