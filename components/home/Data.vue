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
        <LineChart :height="250" :data="chartData" class="mt-10" />
      </client-only>
    </div>
    <form @submit.prevent="submit">
      <h1 class="text-lg font-bold">Penjualan Terbaru</h1>
      <ObatTable :headers="headers" :data="data" class="mt-8" />
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
};
</script>
