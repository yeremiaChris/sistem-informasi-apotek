<template>
  <div class="grid md:grid-cols-2 mt-10 gap-4">
    <div>
      <h1 class="text-lg font-bold">Grafik Penjualan</h1>
      <div class="flex mt-4 gap-3">
        <p class="px-3 py-2 border-b">Hari ini</p>
        <p class="px-3 py-2 border-b">Minggu ini</p>
        <p class="px-3 py-2 border-b">Bulan ini</p>
      </div>
      <client-only>
        <BarChart :height="250" :data="chartData" class="mt-10" />
      </client-only>
    </div>
    <form @submit.prevent="submit">
      <h1 class="text-lg font-bold">Penjualan Terbaru</h1>
      <FormsInput
        class="mb-4 mt-2"
        label="Search"
        name="search"
        v-model="search"
        placeholder="Search here..."
      />
      <ObatTable :headers="headers" :data="data" />
      <Pagination :data="pagination" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Data",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
    pagination: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    submit() {
      const query = this.$route.query;
      this.$router.push({ query: { ...query, query: this.search } });
    },
  },
};
</script>
