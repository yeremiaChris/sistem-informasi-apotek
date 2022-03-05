<template>
  <div>
    <Breadcrumbs url="Obat / Edit" class="mb-7" />
    <!-- title -->
    <FormsTitle title="Form Edit obat" />

    <!-- field name -->
    <FormsErrorMsg :msg="error.name" />
    <FormsInput
      class="mb-4"
      label="Name"
      name="name"
      v-model="name"
      placeholder="Name of medicine..."
    />

    <!-- field price -->
    <FormsErrorMsg :msg="error.price" />
    <FormsInputNumber
      class="mb-4"
      label="Price"
      name="price"
      type="number"
      :value="price"
      v-model="price"
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
    <FormsSingleSelect
      v-model="unit"
      :value="unit"
      class="mb-4"
      label="Unit"
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
      <FormsButton @submit="submit" label="Submit" type="submit" />
    </div>
  </div>
</template>

<script>
import { types, unitItems } from "@/helpers/fields/obat";
export default {
  async asyncData({ app, params, store }) {
    const res = await app.$axios.get("/medicine/" + params.id);
    console.log(res);
    store.commit("obat/getDetail", res.data);
  },
  data() {
    return {
      types,
      unitItems,
    };
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

    price: {
      get() {
        return this.$store.state.obat.formsMedicine.price;
      },
      set(value) {
        const payload = {
          key: "price",
          value,
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
          "/medicine/" + this.$route.params.slug,
          {
            ...this.data,
            supply: 0,
          }
        );
        this.$router.push("/obat/list");
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
