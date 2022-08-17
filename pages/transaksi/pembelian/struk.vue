<template>
  <div>
    <StrukKop
      class="pdf-item px-10 mt-6"
      :is-button="true"
      @export="exportData"
      title="NOTA PEMBELIAN OBAT"
    />
    <div>
      <ObatTable class="mt-10" :headers="header" :data="data" />
    </div>
    <StrukFooter />

    <client-only>
      <vue-html2pdf
        :paginate-elements-by-height="1400"
        :pdf-quality="2"
        pdf-format="a5"
        pdf-content-width="100%"
        pdf-orientation="portrait"
        filename="exportFilename"
        ref="html2Pdf"
      >
        <div slot="pdf-content">
          <StrukKop
            class="pdf-item text-sm px-10 mt-6"
            :is-button="false"
            title="NOTA PEMBELIAN OBAT"
          />
          <div>
            <ObatTable class="mt-10" :headers="header" :data="data" />
          </div>
          <StrukFooter />
        </div>
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: ["Nama", "Jumlah Beli", "Total", "Supplier"],
    };
  },
  computed: {
    data() {
      return this.$route.query.arr.map((item) => {
        return {
          _id: item._id,
          name: item.name,
          jumlahBeli: item.jumlahBeli,
          total: item.total,
          supplier: item.supplier,
        };
      });
    },
  },
  methods: {
    exportData() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>
