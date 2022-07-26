<template>
  <div>
    <h1 class="font-bold text-2xl">Dashboard</h1>
    <p class="text-sm mt-2 text-gray-400">Sistem Informasi Apotek Pontjol</p>
    <div class="mt-10 grid md:grid-cols-4 gap-4">
      <p v-if="!boxes.length">Waiting...</p>
      <HomeCards
        v-else
        v-for="item in boxes"
        :key="item.title"
        :item="item"
        @hover="hover(item.title)"
        @leave="leave(item.title)"
      />
    </div>
    <HomeData
      :headers="headers"
      :data="data"
      :chart-data="chartData"
      :pagination="pagination"
    />
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      boxes: [],
      headers: ["Nama", "Uang Bayar", "Total", "Kembalian", "Tanggal"],

      data: [],
      pagination: {
        page: 1,
        totalPage: 2,
      },
    };
  },
  computed: {
    chartData() {
      return {
        labels: ["test", "test", "test", "test", "test", "test"],
        datasets: [
          {
            data: [12, 11, 13, 9, 10, 8],
            backgroundColor: "rgba(227, 233, 235, 0.4)",
          },
        ],
      };
    },
  },

  async fetch() {
    await this.getData("/penjualan", "data");
    await this.getData("/total-data", "boxes");
  },

  watch: {
    "$route.query.page"() {
      this.$fetch();
    },
    "$route.query.query"() {
      this.$fetch();
    },
  },

  methods: {
    async getData(endpoint, props) {
      const { page, query } = this.$route.query;
      try {
        const res = await this.$axios.get(endpoint, {
          params: {
            page,
            query,
          },
        });
        const { data, pagination } = res.data;
        this[props] = data;
        if (pagination) {
          this.pagination = pagination;
        }
      } catch (error) {
        console.log(error);
      }
    },
    hover(title) {
      this.boxes = this.boxes.map((item) =>
        item.title === title
          ? { ...item, isHover: true }
          : { ...item, isHover: false }
      );
    },
    leave(title) {
      this.boxes = this.boxes.map((item) =>
        item.title === title ? { ...item, isHover: false } : item
      );
    },
  },
};
</script>
