<template>
  <div>
    <Breadcrumbs url="Supplier / Daftar" class="mb-7" />
    <ModalDelete v-show="open" @delete="deleteData" />
    <ObatHeader
      :items="itemsSelect"
      label="Daftar Supplier"
      breadcrumbs="Supplier / Daftar"
      @export="exportPdf"
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
        ref="html2PdfSupplier"
      >
        <PrintReport
          slot="pdf-content"
          :headers="headers"
          :data="printData"
          title="LAPORAN DATA SUPPLIER"
        />
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",

  async fetch() {
    const { page, query, sortBy } = this.$route.query;

    const res = await this.$axios.get("/supplier", {
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
        media: item.media,
      };
    });

    this.data = datas;

    this.pagination = pagination;
  },

  data() {
    return {
      data: [],
      printData: [],
      itemsSelect: [
        {
          title: "Name",
          value: "name",
        },
        {
          title: "Terbaru",
          value: "-createdAt",
        },
      ],

      pagination: {
        page: 1,
        totalPage: 2,
      },

      headers: ["Name", "Image"],
    };
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
      const res2 = await this.$axios.get("/supplier/print");
      this.printData = res2.data.map((item) => {
        return {
          _id: item._id,
          id: item._id,
          name: item.name,
          media: item.media,
        };
      });
    },
    async deleteData() {
      try {
        await this.$axios.delete("/supplier/" + parseInt(this.deleteId));
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
      this.$refs.html2PdfSupplier.generatePdf();
    },
  },
};
</script>
