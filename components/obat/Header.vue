<template>
  <form @submit.prevent="submit">
    <!-- <Breadcrumbs :url="breadcrumbs" class="mb-7" /> -->
    <div class="flex justify-between">
      <h1 class="text-xl font-bold uppercase">{{ label }}</h1>
      <div class="flex gap-3">
        <button
          @click="exportPdf"
          v-if="
            !$route.path.includes('admin') &&
            !$route.path.includes('jenis') &&
            !$route.path.includes('satuan')
          "
          type="button"
          class="flex gap-3 font-bold items-center px-4 py-4 uppercase border border-gray-300 shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <img src="/export.svg" class="w-6" alt="export" />
          Export
        </button>
        <NuxtLink
          v-if="!$route.path.includes('laporan')"
          :to="
            !link
              ? $route.path.includes('jenis')
                ? '/obat/jenis/tambah'
                : $route.path.includes('satuan')
                ? '/obat/satuan/tambah'
                : 'tambah'
              : link
          "
          class="font-bold items-center px-4 py-4 uppercase border border-gray-300 shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Tambah {{ label }}
        </NuxtLink>
      </div>
    </div>
    <div class="flex justify-between mt-8" v-if="!$route.path.includes('view')">
      <FormsInput
        class="mb-4"
        label="Search"
        name="search"
        v-model="search"
        placeholder="Search here..."
      />
      <FormsSingleSelect label="Urutkan" :items="items" v-model="order" />
    </div>
  </form>
</template>

<script>
export default {
  name: "HeaderObatTable",
  props: {
    link: {
      type: String,
      default: () => "",
    },
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
  data() {
    return {
      order: "",
      search: "",
    };
  },
  watch: {
    order() {
      const query = this.$route.query;
      this.$router.push({ query: { ...query, sortBy: this.order } });
    },
  },
  methods: {
    submit() {
      const query = this.$route.query;
      this.$router.push({ query: { ...query, query: this.search } });
    },
    exportPdf(e) {
      e.preventDefault();
      this.$emit("export");
    },
  },
};
</script>
