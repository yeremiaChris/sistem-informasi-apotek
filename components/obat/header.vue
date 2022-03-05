<template>
  <div>
    <Breadcrumbs url="Obat  / Daftar" class="mb-7" />
    <div class="flex justify-between">
      <h1 class="text-xl font-bold uppercase">{{ label }}</h1>
      <NuxtLink
        to="tambah"
        class="inline-flex font-bold items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Tambah {{ label }}
      </NuxtLink>
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
  },
};
</script>
