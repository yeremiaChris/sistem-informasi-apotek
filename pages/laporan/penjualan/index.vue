<template>
  <div>
    <ModalDelete v-show="open" @delete="deleteData" />
    <ObatHeader
      :items="itemsSelect"
      label="Laporan penjualan"
      @export="exportPdf"
      @getData="getData('/penjualan', 'data')"
    />
    <ObatTable :headers="headers" :data="data" />
    <Pagination :data="pagination" />
    <client-only>
      <vue-html2pdf
        :paginate-elements-by-height="1400"
        :pdf-quality="2"
        pdf-content-width="800px"
        pdf-orientation="portrait"
        filename="exportFilename"
        ref="html2Pdf"
      >
        <PrintReport
          slot="pdf-content"
          :headers="headers"
          :data="data"
          title="LAPORAN PENJUALAN OBAT"
        />
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "Penjualan",

  data() {
    return {
      pagination: {
        page: 1,
        totalPage: 2,
      },
      headers: [
        "Nama",
        "Jenis",
        "Satuan",
        "Harga jual",
        "Jumlah jual",
        "Total harga",
        "Tanggal",
      ],
      printData: [],
      data: [],
      itemsSelect: [
        {
          title: "Newest",
          value: "newest",
        },
        {
          title: "Type",
          value: "type",
        },
      ],
    };
  },

  async fetch() {
    await this.getData("/penjualan", "data");
  },

  computed: {
    open() {
      return this.$store.state.deleteModal;
    },
    deleteId() {
      return this.$store.state.deleteId;
    },
  },

  watch: {
    "$route.query.page"() {
      this.$fetch();
    },
    "$route.query.query"() {
      this.$fetch();
    },
    "$route.query.sortBy"() {
      this.$fetch();
    },
  },

  methods: {
    async getDataPrint() {
      const res2 = await this.$axios.get("/penjualan/print");
      this.printData = res2.data.map((item) => {
        const { title, uangBayar, total, kembalian, updatedAt } = item;
        return {
          title,
          uangBayar,
          total,
          kembalian,
          updatedAt,
        };
      });
    },
    async exportPdf() {
      //
      await this.getDataPrint();
      this.$refs.html2Pdf.generatePdf();
    },
    async deleteData() {
      try {
        await this.$axios.delete("/penjualan/" + parseInt(this.deleteId));
        this.$store.commit("deleteModalFalse");
        this.$nuxt.refresh();
      } catch (error) {
        this.$nuxt.error({
          statusCode: error.response.status,
          message: "Delete data was fail.",
        });
      }
    },

    async getData(endpoint, props) {
      const { page, query, sortBy, startDate, endDate } = this.$route.query;
      const res = await this.$axios.get(endpoint, {
        params: {
          page,
          query,
          sortBy,
          startDate,
          endDate,
        },
      });
      const { data, pagination } = res.data;
      this[props] = data.map((item) => {
        const {
          _id,
          name,
          type,
          unit,
          sellingPrice,
          jumlahBeli,
          total,
          updatedAt,
        } = item;
        return {
          _id,
          name,
          type,
          unit,
          sellingPrice,
          jumlahBeli,
          total,
          updatedAt,
        };
      });
      this.pagination = pagination;
    },
  },
};
</script>
