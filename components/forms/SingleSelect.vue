<template>
  <div style="min-width: 200px">
    <label for="urutkan" class="block text-lg font-medium text-gray-700"
      >{{ label }}
    </label>
    <select
      id="urutkan"
      @change="handleChange"
      :value="value"
      name="urutkan"
      class="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <!-- <option selected class="text-gray-500">Pilih</option> -->
      <option selected="" disabled value="">Pilih....</option>
      <option v-for="(item, index) in items" :key="index" :value="item.value">
        {{ item.title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SingleSelect",
  props: {
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleChange(e) {
      if (e.target.value === "Pilih") {
        this.$emit("input", "");
      } else {
        const data = {
          url: "",
        };
        this.$emit("input", e.target.value);
        this.$emit("setError");
      }
    },
  },
};
</script>
