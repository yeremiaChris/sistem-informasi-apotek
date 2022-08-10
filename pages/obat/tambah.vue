<template>
  <form @submit.prevent="submit">
    <Breadcrumbs url="Obat / Tambah" class="mb-7" />
    <!-- title -->
    <FormsTitle title="Form Tambah obat" />
    <FormsErrorMsg :msg="errorAbove" class="mb-4" />
    <!-- field name -->
    <FormsErrorMsg :msg="errors.name" />
    <FormsInput
      class="mb-4"
      label="Nama obat"
      name="name"
      v-model="form['name']"
      @setError="setError('name')"
      placeholder="Nama obat..."
    />

    <!-- field price -->
    <FormsErrorMsg :msg="errors.purchasePrice" />
    <FormsInputNumber
      class="mb-4"
      label="Harga beli"
      name="purchasePrice"
      v-model="form['purchasePrice']"
      @setError="setError('purchasePrice')"
      placeholder="0"
    />

    <FormsErrorMsg :msg="errors.sellingPrice" />
    <FormsInputNumber
      class="mb-4"
      label="Harga jual"
      name="sellingPrice"
      @setError="setError('sellingPrice')"
      v-model="form['sellingPrice']"
      placeholder="0"
    />

    <!-- field type -->
    <FormsErrorMsg :msg="errors.type" />
    <FormsSingleSelect
      v-model="form['type']"
      class="mb-4"
      label="Jenis"
      @setError="setError('type')"
      :items="types"
    />

    <!-- field unit -->
    <FormsErrorMsg :msg="errors.unit" />
    <FormsSingleSelect
      v-model="form['unit']"
      class="mb-4"
      @setError="setError('unit')"
      label="Satuan"
      :items="unitItems"
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
import { types, unitItems } from "@/helpers/fields/obat";
export default {
  data() {
    return {
      types,
      unitItems,
      errorAbove: "",
      form: {
        name: "",
        purchasePrice: "",
        sellingPrice: "",
        type: "",
        unit: "",
      },
      errors: {
        name: "",
        purchasePrice: "",
        sellingPrice: "",
        type: "",
        unit: "",
      },
    };
  },

  async fetch() {
    await this.getData("/medicine/jenis/select-data", "types");
    await this.getData("/medicine/satuan/select-data", "unitItems");
  },

  methods: {
    setError(key) {
      this.errors[key] = "";
    },
    async getData(endpoint, props) {
      try {
        const res = await this.$axios.get(endpoint);
        this[props] = res.data.map((item) => ({
          title: item.title,
          value: item.title.toLowerCase(),
        }));
      } catch (error) {}
    },
    async submit() {
      const object = this.errors;
      let arr = [];
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          arr.push({ name: key, value: this.form[key] });
          if (!this.form[key]) {
            this.errors[key] = "Field ini harus diisi.";
          } else {
            if (
              key === "purchasePrice" ||
              (key === "sellingPrice" &&
                this.form["purchasePrice"] >= this.form["sellingPrice"])
            ) {
              this.errorAbove = "Harga jual harus lebih besar dari harga beli.";
            }
          }
        }
      }

      const isNotEmpty = arr.some((el) =>
        el.name === "purchasePrice" || el.name === "sellingPrice"
          ? this.form["purchasePrice"] < this.form["sellingPrice"]
          : el.value
      );
      if (isNotEmpty) {
        try {
          await this.$axios.post("/medicine", {
            ...this.data,
            supply: 0,
          });
          // this.$refs.formEdit.reset(); // This will clear that form
          this.$router.push("/obat/list");
          const payload2 = {
            value: true,
            props: "success",
          };
          this.$store.commit("setProps", payload2);
        } catch (error) {
          console.log(error.response);
          if (error.response.data.errors) {
            for (const property in error.response.data.errors) {
              const payload = {
                key: property,
                value: error.response.data.errors[property],
              };
              this.$store.commit("obat/getErrorFromBackend", payload);
            }
          }
          if (error.response.data.message) {
            this.errorAbove = error.response.data.message;
          }
        }
      }
      // if (this.sellingPrice > this.purchasePrice) {
      //   try {
      //     await this.$axios.post("/medicine", {
      //       ...this.data,
      //       supply: 0,
      //     });
      //     // this.$refs.formEdit.reset(); // This will clear that form
      //     this.$router.push("/obat/list");
      //     const payload2 = {
      //       value: true,
      //       props: "success",
      //     };
      //     this.$store.commit("setProps", payload2);
      //   } catch (error) {
      //     console.log(error.response);
      //     if (error.response.data.errors) {
      //       for (const property in error.response.data.errors) {
      //         const payload = {
      //           key: property,
      //           value: error.response.data.errors[property],
      //         };
      //         this.$store.commit("obat/getErrorFromBackend", payload);
      //       }
      //     }
      //     if (error.response.data.message) {
      //       this.errorAbove = error.response.data.message;
      //     }
      //   }
      // } else {
      //   this.errorAbove = "Harga jual harus lebih besar dari harga beli.";
      // }
    },
    back() {
      this.$router.back();
    },
  },
};
</script>
