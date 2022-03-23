<template>
  <div>
    <ModalDelete v-show="open" @delete="deleteData" />
    <ObatHeader
      :items="itemsSelect"
      label="Daftar Supplier"
      breadcrumbs="Supplier / Daftar"
    />
    <ObatTable :headers="headers" :data="data" />
    <Pagination :data="pagination" />
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  async asyncData({ app }) {},

  async fetch() {
    const res = await this.$axios.get("/supplier");
    const data = res.data.map((item) => {
      return {
        id: item._id,
        name: item.name,
        media: item.media,
      };
    });
    this.data = data;
  },

  data() {
    return {
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

      pagination: {
        page: 1,
        totalPage: 2,
      },

      headers: ["Name", "Image"],
    };
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
  },
};
</script>
