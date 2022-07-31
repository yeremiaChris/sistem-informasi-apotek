<template>
  <form ref="formEdit" @submit.prevent="submit">
    <Breadcrumbs url="Obat / Edit" class="mb-7" />
    <!-- title -->
    <FormsTitle title="Form Edit obat" />

    <!-- field name -->
    <FormsErrorMsg :msg="error.name" />
    <FormsInput
      class="mb-4"
      label="Nama obat"
      name="name"
      v-model="name"
      placeholder="Nama obat..."
    />

    <!-- field price -->
    <FormsErrorMsg :msg="error.purchasePrice" />
    <FormsInputNumber
      class="mb-4"
      label="Harga beli"
      name="purchasePrice"
      v-model="purchasePrice"
      placeholder="0"
    />

    <FormsErrorMsg :msg="error.sellingPrice" />
    <FormsInputNumber
      class="mb-4"
      label="Harga jual"
      name="sellingPrice"
      v-model="sellingPrice"
      placeholder="0"
    />

    <!-- field type -->
    <FormsErrorMsg :msg="error.type" />
    <FormsSingleSelect
      v-model="type"
      :value="type"
      class="mb-4"
      label="Jenis"
      :items="types"
    />

    <!-- field unit -->
    <FormsErrorMsg :msg="error.unit" />
    {{ unit }}
    <FormsSingleSelect
      v-model="unit"
      :value="unit"
      class="mb-4"
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
    };
  },

  async fetch() {
    const res = await this.$axios.get("/medicine/" + this.$route.params.id);
    this.$store.commit("obat/getDetail", res.data);
  },

  computed: {
    name: {
      get() {
        return this.$store.state.obat.formsMedicine.name;
      },
      set(value) {
        const payload = {
          key: "name",
          value,
        };
        this.$store.commit("obat/changeData", payload);
      },
    },

    purchasePrice: {
      get() {
        return this.$store.state.obat.formsMedicine.purchasePrice;
      },
      set(value) {
        const payload = {
          key: "purchasePrice",
          value: parseInt(value),
        };
        this.$store.commit("obat/changeData", payload);
      },
    },

    sellingPrice: {
      get() {
        return this.$store.state.obat.formsMedicine.sellingPrice;
      },
      set(value) {
        const payload = {
          key: "sellingPrice",
          value: parseInt(value),
        };
        this.$store.commit("obat/changeData", payload);
      },
    },

    type: {
      get() {
        return this.$store.state.obat.formsMedicine.type;
      },
      set(value) {
        const payload = {
          key: "type",
          value,
        };
        this.$store.commit("obat/changeData", payload);
      },
    },

    unit: {
      get() {
        return this.$store.state.obat.formsMedicine.unit;
      },
      set(value) {
        const payload = {
          key: "unit",
          value,
        };
        this.$store.commit("obat/changeData", payload);
      },
    },
    data() {
      return this.$store.state.obat.formsMedicine;
    },
    error() {
      return this.$store.state.obat.errorMedicine;
    },
  },

  methods: {
    async submit() {
      try {
        const res = await this.$axios.put(
          "/medicine/" + this.$route.params.id,
          {
            ...this.data,
          }
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
      }
    },

    back() {
      this.$router.back();
    },
  },
};
</script>
