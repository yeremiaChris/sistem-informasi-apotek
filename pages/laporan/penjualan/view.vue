<template>
  <div>
    <ModalDelete v-show="open" @delete="deleteData" />
    <ObatHeader
      :items="itemsSelect"
      label="Laporan Detail Penjualan"
      @export="exportPdf"
    />
    <ObatTable :headers="headers" :data="datas" class="mt-20" />
    <Pagination :data="pagination" />
    <client-only>
      <vue-html2pdf
        :paginate-elements-by-height="1400"
        :pdf-quality="2"
        pdf-content-width="100%"
        pdf-orientation="landscape"
        filename="exportFilename"
        ref="html2Pdf"
      >
        <PrintReport
          slot="pdf-content"
          :headers="headers"
          :data="datas"
          title="LAPORAN DETAIL PENJUALAN OBAT"
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
        "Harga beli",
        "Persediaan awal",
        "Tanggal",
        "Jumlah beli",
        "Resep dokter",
        "Total harga",
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
    datas() {
      return this.$route.query.data;
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
      const { page, query, sortBy } = this.$route.query;
      const res = await this.$axios.get(endpoint, {
        params: {
          page,
          query,
          sortBy,
        },
      });
      const { data, pagination } = res.data;
      this[props] = data.map((item) => {
        return {
          ...item,
          id: item._id,
        };
      });
      this.pagination = pagination;
    },
  },
};
</script>
