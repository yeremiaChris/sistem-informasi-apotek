<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col mt-4">
    <div class="-my-2 overflow-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No.
                </th>
                <th
                  v-for="(header, index) in headers"
                  :key="index"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>

            <tbody v-if="data.length">
              <tr
                v-for="(items, index) in data"
                :key="index"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ index + 1 }}
                </td>

                <td
                  v-for="(value, key, idx) in items"
                  v-show="
                    key !== '_id' &&
                    key !== 'media' &&
                    key !== 'supplierId' &&
                    key !== 'id'
                  "
                  :key="idx"
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{
                    key === "updatedAt" ? new Date(value).toDateString() : value
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
                  {{ key }}
                </td>

                <td
                  class="px-6 py-4 whitespace-nowrap flex gap-3 text-sm font-medium"
                >
                  <div v-if="!$route.path.includes('transaksi')">
                    <NuxtLink
                      :to="items._id.toString()"
                      class="text-indigo-600 hover:text-indigo-900"
                      >Edit
                    </NuxtLink>

                    <button
                      v-if="!$route.path.includes('pembelian')"
                      class="text-red-600 hover:text-red-900"
                      @click="deleteModalTrue(items.id)"
                    >
                      Delete
                    </button>
                  </div>

                  <button
                    v-else
                    class="text-red-600 hover:text-red-900"
                    @click="deleteTransaction(items)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>

            <p v-else class="px-4 py-4">Data is emtpy.</p>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteModalTrue(id) {
      this.$store.commit("deleteModalTrue");
      this.$store.commit("getDeleteId", id);
    },

    deleteData(id) {
      this.$store.commit("deleteModalTrue");
      this.$store.commit("getDeleteId", id);
    },

    deleteDataTransaction(data) {
      this.$store.emit("delete", data);
    },

    edit(item) {
      console.log(item);
      this.$emit("setValueProduct", item.nameMedicine);
      this.$emit("setValueSupplier", item.nameSupplier);
    },

    deleteTransaction(item) {
      this.$store.commit("deleteData", item);
    },
  },
};
</script>
