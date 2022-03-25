<template>
  <div>
    <!-- <Breadcrumbs :url="breadcrumbs" class="mb-7" /> -->
    <div class="flex justify-between">
      <h1 class="text-xl font-bold uppercase">{{ label }}</h1>
      <div class="flex gap-3">
        <NuxtLink
          to="tambah"
          class="flex gap-3 font-bold items-center px-4 py-4 uppercase border border-gray-300 shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <img src="/export.svg" class="w-6" alt="export" />
          Export
        </NuxtLink>
        <NuxtLink
          to="tambah"
          class="font-bold items-center px-4 py-4 uppercase border border-gray-300 shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Tambah {{ label }}
        </NuxtLink>
      </div>
    </div>
    <div class="flex justify-end mt-8">
      <FormsSingleSelect label="Urutkan" :items="items" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderObatTable",
  props: {
    items: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    breadcrumbs: {
      type: String,
      default: () => "Obat  / Daftar",
    },
  },
};
</script>
