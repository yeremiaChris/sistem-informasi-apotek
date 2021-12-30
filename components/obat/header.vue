<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-xl">Daftar Obat</h1>
      <NuxtLink
        to="tambah"
        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Tambah Daftar Obat
      </NuxtLink>
    </div>
    <div class="flex justify-end mt-8">
      <div>
        <label for="urutkan" class="block text-sm font-medium text-gray-700"
          >Urutkan</label
        >
        <select
          id="urutkan"
          name="urutkan"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option>United States</option>
          <option selected="">Canada</option>
          <option>Mexico</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderObatTable",
  mounted() {
    console.log(this.$route);
  },
};
</script>
