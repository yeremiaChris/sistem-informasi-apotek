<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col mt-4">
    <div class="-my-2 overflow-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden border-b border-gray-200">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-7 text-left text-xs font-medium text-gray-500 uppercase"
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
                :class="{
                  'bg-white': index % 2 === 0,
                  'bg-gray-50': index % 2 !== 0,
                  'text-red-600': $dayjs() > $dayjs(items.updatedAt),
                }"
              >
                <td
                  class="px-6 py-4 font-medium"
                  :class="{
                    'text-xs': $route.path.includes('struk'),
                    'text-sm': !$route.path.includes('struk'),
                  }"
                >
                  {{ index + 1 }}
                </td>

                <td
                  v-for="(value, key, idx) in items"
                  v-show="
                    key !== '_id' &&
                    key !== 'media' &&
                    key !== 'supplierId' &&
                    key !== 'id' &&
                    key !== 'createdAt' &&
                    key !== 'recipiData' &&
                    key !== '__v' &&
                    key !== 'recepiData' &&
                    key !== 'laporan'
                  "
                  :key="idx + 'recepiData'"
                  class="px-6 py-4 font-medium"
                  :class="{
                    'text-xs': $route.path.includes('struk'),
                    'text-sm': !$route.path.includes('struk'),
                  }"
                >
                  <span v-if="key === 'isRecipe'">{{
                    !value ? "Tidak" : "Ya"
                  }}</span>
                  <span v-else>
                    {{
                      key === "supplier"
                        ? value && value.title
                        : key === "updatedAt"
                        ? $dayjs() > $dayjs(value)
                          ? $dayjs(value).format("DD MMM YYYY | HH:mm") +
                            " (expired)"
                          : $dayjs(value).format("DD MMM YYYY | HH:mm")
                        : typeof value === "number"
                        ? value.toLocaleString()
                        : key === "laporan"
                        ? value.length
                        : value
                    }}
                  </span>
                </td>

                <td
                  v-for="(value, key, idx) in items"
                  v-show="key === 'recepiData'"
                  :key="idx"
                  class="px-6 py-4 text-gray-900"
                  :class="{
                    'text-xs': $route.path.includes('struk'),
                    'text-sm': !$route.path.includes('struk'),
                  }"
                >
                  <div v-if="value && value.IdentitasDokter">
                    <span
                      >Identitas dokter :
                      <span class="font-bold"
                        >{{ value.IdentitasDokter }}
                      </span>
                    </span>
                    <br />
                    <span
                      >Identitas customer :
                      <span class="font-bold">{{
                        value.IdentitasCustomer
                      }}</span>
                    </span>
                    <br />
                    <span
                      >Informasi obat :
                      <span class="font-bold">{{
                        value.InformasiObat
                      }}</span> </span
                    ><br />
                    <span
                      >Deskripsi :
                      <span class="font-bold">{{ value.Deskripsi }}</span>
                    </span>
                  </div>
                  <p v-else>Tidak dengan resep dokter</p>
                </td>

                <td
                  v-for="(value, key, idx) in items"
                  v-show="key === 'media'"
                  :key="idx + 'media'"
                  class="px-6 py-4 font-medium text-gray-900"
                  :class="{
                    'text-xs': $route.path.includes('struk'),
                    'text-sm': !$route.path.includes('struk'),
                  }"
                >
                  <img
                    :src="
                      value && value.defaultImage
                        ? $config.imageURL + value.defaultImage
                        : ''
                    "
                    :alt="(value && value.defaultImage) || ''"
                    style="width: 150px"
                  />
                </td>

                <td
                  v-if="$route.path !== '/'"
                  class="px-6 py-4 font-medium"
                  :class="{
                    'text-xs': $route.path.includes('struk'),
                    'text-sm': !$route.path.includes('struk'),
                  }"
                >
                  <div
                    v-if="
                      !$route.path.includes('laporan') &&
                      !$route.path.includes('struk')
                    "
                    class="flex gap-5"
                  >
                    <NuxtLink
                      :to="
                        !edit
                          ? $route.path.includes('jenis')
                            ? '/obat/jenis/' + items._id.toString()
                            : $route.path.includes('satuan')
                            ? '/obat/satuan/' + items._id.toString()
                            : items._id.toString()
                          : edit + items._id
                      "
                      class="text-indigo-600 hover:text-indigo-900"
                      >Edit
                    </NuxtLink>

                    <button
                      class="text-red-600 hover:text-red-900"
                      @click="deleteModalTrue(items.id)"
                    >
                      Delete
                    </button>
                  </div>
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
    edit: {
      type: String,
      default: () => "",
    },
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    deleteKey: {
      type: String,
      default: () => "deleteData",
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

    handleEdit(item) {
      console.log(item);
      this.$emit("setValueProduct", item.nameMedicine);
      this.$emit("setValueSupplier", item.nameSupplier);
    },

    deleteTransaction(item) {
      this.$store.commit(this.deleteKey, item);
    },
  },
};
</script>
