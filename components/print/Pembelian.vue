<template>
  <div class="px-10">
    <StrukKop
      class="pdf-item px-10 mt-6"
      :is-button="false"
      title="STRUK PEMBAYARAN"
    />
    <PrintReportTable :data="report.laporan" :headers="headers" />
    <div class="grid gap-4 font-bold mt-4">
      <p>Total bayar : Rp. {{ report.total.toLocaleString() }}</p>
      <p>Uang bayar : Rp. {{ report.uangBayar.toLocaleString() }}</p>
      <p>Uang kembalian : Rp. {{ report.kembalian.toLocaleString() }}</p>
    </div>
    <StrukFooter />
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
  },
  name: "ReportPembelian",
  computed: {
    report() {
      return this.$store.state.report;
    },
  },
};
</script>
