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
            !$route.path.includes('obat/list') &&
            !$route.path.includes('supplier/list') &&
            !$route.path.includes('satuan')
          "
          type="button"
          class="flex gap-3 font-bold items-center px-4 py-4 uppercase border border-gray-300 shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <img src="/export.svg" class="w-6" alt="export" />
          Cetak
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
    <p class="mt-4">Filter by date</p>
    <div v-if="$route.path.includes('laporan')" class="flex items-center gap-3">
      <FormsInput
        label="Start date"
        name="startDate"
        type="date"
        v-model="startDate"
      />
      <FormsInput
        label="End date"
        name="startDate"
        type="date"
        v-model="endDate"
      />
      <FormsButton label="Filter" class="mt-4" />
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
      startDate: "",
      endDate: "",
    };
  },
  mounted() {
    const query = this.$route.query;

    if (query.startDate) {
      this.startDate = query.startDate;
    }
    if (query.endDate) {
      this.endDate = query.endDate;
    }
  },
  watch: {
    order() {
      const query = this.$route.query;
      this.$router.push({ query: { ...query, sortBy: this.order } });
    },
    startDate() {
      const query = this.$route.query;
      this.$router.push({ query: { ...query, startDate: this.startDate } });
    },
    endDate() {
      const query = this.$route.query;
      this.$router.push({ query: { ...query, endDate: this.endDate } });
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
