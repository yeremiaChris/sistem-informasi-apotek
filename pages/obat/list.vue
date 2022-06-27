<template>
  <div>
    <ModalDelete v-show="open" @delete="deleteData" />
    <ObatHeader :items="itemsSelect" label="Daftar Obat" @export="exportPdf" />
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
        <PrintReport slot="pdf-content" :headers="headers" :data="printData" />
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      printData: [],
      pagination: {
        page: 1,
        totalPage: 2,
      },
      headers: [
        "Nama",
        "Harga",
        " Persediaan",
        "Tipe",
        "Satuan",
        "Tanggal update",
      ],
      data: [],
      itemsSelect: [
        {
          title: "Nama",
          value: "name",
        },
        {
          title: "Harga",
          value: "price",
        },
        {
          title: "Persediaan",
          value: "supply",
        },
      ],
    };
  },

  async fetch() {
    const { page, query, sortBy } = this.$route.query;
    const res = await this.$axios.get("/medicine", {
      params: {
        page,
        query,
        sortBy,
      },
    });

    const { data, pagination } = res.data;
    const datas = data.map((item) => {
      return {
        _id: item._id,
        id: item._id,
        name: item.name,
        price: item.price,
        supply: item.supply,
        type: item.type,
        unit: item.unit,
        updatedAt: item.updatedAt,
      };
    });
    this.data = datas;
    this.pagination = pagination;
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

  computed: {
    open() {
      return this.$store.state.deleteModal;
    },
    deleteId() {
      return this.$store.state.deleteId;
    },
  },

  methods: {
    async getData() {
      const res2 = await this.$axios.get("/medicine/print");
      this.printData = res2.data.map((item) => {
        return {
          _id: item._id,
          id: item._id,
          name: item.name,
          price: item.price,
          supply: item.supply,
          type: item.type,
          unit: item.unit,
          updatedAt: item.updatedAt,
        };
      });
    },

    async deleteData() {
      try {
        await this.$axios.delete("/medicine/" + parseInt(this.deleteId));
        this.$store.commit("deleteModalFalse");
        this.$nuxt.refresh();
      } catch (error) {
        this.$nuxt.error({
          statusCode: error.response.status,
          message: "Delete data was fail.",
        });
      }
    },
    async exportPdf() {
      //
      await this.getData();
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>
