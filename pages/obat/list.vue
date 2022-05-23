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
    const data = res.data.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        price: item.price,
        supply: item.supply,
        type: item.type,
        unit: item.unit,
        updatedAt: item.updatedAt,
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
      headers: ["Name", "Price", "Supply", "Type", "Unit", "Updated At"],
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
