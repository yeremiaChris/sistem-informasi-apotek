<template>
  <div>
    <label for="urutkan" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <select
      id="urutkan"
      name="urutkan"
      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
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
  },
};
</script>
