<template>
  <table class="min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <th
          v-for="(item, index) in headers"
          :key="index"
          scope="col"
          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
        >
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="person in data" :key="person.email">
        <td
          v-for="(item, key, index) in person"
          :key="index"
          v-show="
            key !== '_id' &&
            key !== 'media' &&
            key !== 'supplierId' &&
            key !== 'id'
          "
          class="pl-6 pr-3 py-3.5 text-left text-sm text-gray-900"
        >
          {{
            typeof item === "number"
              ? item.toLocaleString()
              : key === "updatedAt"
              ? $dayjs(item).format("dddd, MMM YYYY")
              : item
          }}
        </td>

        <td
          v-for="(value, key, idx) in items"
          v-show="key === 'media'"
          :key="idx + 'media'"
          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          <img
            :src="$config.imageURL + value.defaultImage"
            :alt="value.defaultImage"
            style="width: 150px"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
  name: "Table",
};
</script>
