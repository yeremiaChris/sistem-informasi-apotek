<template>
  <form ref="formEdit" @submit.prevent="submit">
    <Breadcrumbs url="Obat / Edit" class="mb-7" />
    <!-- title -->
    <FormsTitle title="Form Edit obat" />
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

    <FormsErrorMsg :msg="errors.expiredAt" />
    <FormsInput
      class="mb-4"
      label="Expired at"
      type="date"
      name="expiredAt"
      v-model="form['expiredAt']"
      @setError="setError('expiredAt')"
      placeholder="Expired At"
    />

    <!-- field price -->
    <FormsErrorMsg :msg="errors.purchasePrice" />
    <FormsInputNumber
      class="mb-4"
      label="Harga beli"
      name="purchasePrice"
      @setError="setError('purchasePrice')"
      v-model="form['purchasePrice']"
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
      @setError="setError('type')"
      :value="form['type']"
      class="mb-4"
      label="Jenis"
      :items="types"
    />

    <!-- field unit -->
    <FormsErrorMsg :msg="errors.unit" />
    <FormsSingleSelect
      v-model="form['unit']"
      @setError="setError('unit')"
      :value="form['unit']"
      class="mb-4"
      label="Satuan"
      :items="unitItems"
    />

    <!-- button submit -->
    <div class="flex justify-end gap-3">
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
      unit: "",
      type: "",
      errorAbove: "",
      form: {
        name: "",
        purchasePrice: "",
        sellingPrice: "",
        expiredAt: new Date().toDateString(),
        type: "",
        unit: "",
      },
      errors: {
        name: "",
        purchasePrice: "",
        sellingPrice: "",
        type: "",
        expiredAt: "",
        unit: "",
      },
    };
  },

  async fetch() {
    await this.getData("/medicine/jenis/select-data", "types");
    await this.getData("/medicine/satuan/select-data", "unitItems");
    const res = await this.$axios.get("/medicine/" + this.$route.params.id);
    const object = res.data;
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        this.form[key] = object[key];
      }
    }
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
            this.errors[key] = "Field ini harus diisi";
          } else {
            if (
              key === "purchasePrice" &&
              key === "sellingPrice" &&
              parseInt(this.form["purchasePrice"]) >=
                parseInt(this.form["sellingPrice"])
            ) {
              this.errorAbove = "Harga jual harus lebih besar dari harga beli.";
            }
          }
        }
      }

      const isNotEmpty = arr.every((el) =>
        el.name !== "purchasePrice" && el.name !== "sellingPrice"
          ? el.value
          : true
      );
      if (
        isNotEmpty &&
        parseInt(this.form["purchasePrice"]) <
          parseInt(this.form["sellingPrice"])
      ) {
        try {
          const form = {
            ...this.form,
            purchasePrice: parseInt(this.form.purchasePrice),
            sellingPrice: parseInt(this.form.sellingPrice),
            supply: 0,
          };
          const res = await this.$axios.put(
            "/medicine/" + this.$route.params.id,
            form
          );
          this.$router.push("/obat/list");
          this.$refs.formEdit.reset(); // This will clear that form
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
        } catch (error) {
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
      } else {
        this.errorAbove = "Harga jual harus lebih besar dari harga beli.";
      }
    },

    back() {
      this.$router.back();
    },
  },
};
</script>
