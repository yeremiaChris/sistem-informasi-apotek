<template>
  <div>
    <ModalDelete v-show="open" @delete="deleteData" />
    <ObatHeader :items="itemsSelect" label="Laporan pembelian" />
    <ObatTable :headers="headers" :data="datas" />
    <Pagination :data="pagination" />
  </div>
</template>

<script>
export default {
  name: "Pembelian",

  data() {
    return {
      pagination: {
        page: 1,
        totalPage: 2,
      },
      headers: ["Nama", "Total harga"],
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
    await this.getData("/pembelian", "data");
  },

  computed: {
    open() {
      return this.$store.state.deleteModal;
    },
    deleteId() {
      return this.$store.state.deleteId;
    },
    datas() {
      const data = this.data.map((item) => {
        return {
          title: item.title,
          total:
            "Rp " +
            item.laporan
              .reduce((acc, item) => acc + item.total, 0)
              .toLocaleString(),
          _id: item._id,
          id: item._id,
        };
      });
      return data;
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
    async deleteData() {
      try {
        await this.$axios.delete("/pembelian/" + parseInt(this.deleteId));
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
      this[props] = data;
      this.pagination = pagination;
    },
  },
};
</script>
