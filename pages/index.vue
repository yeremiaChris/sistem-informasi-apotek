<template>
  <div>
    <h1 class="font-bold text-2xl">Dashboard</h1>
    <p class="text-sm mt-2 text-gray-400">Sistem Informasi Apotek Pontjol</p>
    <div class="mt-10 grid grid-cols-4 gap-4">
      <HomeCards
        v-for="item in boxes"
        :key="item.title"
        :item="item"
        @hover="hover(item.title)"
        @leave="leave(item.title)"
      />
    </div>
    <div class="grid grid-cols-2 mt-10">
      <div>
        <h1 class="text-lg font-bold">Grafik Penjualan</h1>
        <div class="flex mt-4 gap-3">
          <p class="px-2 py-2 border-b">Hari ini</p>
          <p class="px-2 py-2 border-b">Minggu ini</p>
          <p class="px-2 py-2 border-b">Bulan ini</p>
        </div>
        <client-only>
          <BarChart :height="200" :data="chartData" class="mt-10" />
        </client-only>
      </div>
      <div>kotak</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      boxes: [
        { title: "Obat", isHover: false },
        { title: "Supplier", isHover: false },
        { title: "Pembelian", isHover: false },
        { title: "Penjualan", isHover: false },
      ],
    };
  },
  computed: {
    chartData() {
      return {
        labels: ["test", "test", "test", "test", "test", "test"],
        datasets: [
          {
            data: [12, 11, 13, 9, 10, 8],
            backgroundColor: "#193335",
          },
        ],
      };
    },
  },
  methods: {
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
