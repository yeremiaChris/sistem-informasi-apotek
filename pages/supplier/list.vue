<template>
  <div>
    <ModalDelete v-show="open" @delete="deleteData" />
    <ObatHeader :items="itemsSelect" label="Daftar Obat" />
    <ObatTable :headers="headers" :data="data" />
    <Pagination :data="pagination" />
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  async asyncData({ app }) {
    const res = await app.$axios.get("/medicine");
    const test = await app.$axios.get("/supplier");
    console.log(test.data);
    const data = test.data.map((item) => {
      return {
        id: item._id,
        name: item.name,
        media: item.media,
      };
    });
    return {
      data,
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
  data() {
    return {
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
  },
};
</script>
