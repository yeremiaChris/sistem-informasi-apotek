<template>
  <div>
    <ObatHeader />
    <ObatTable :headers="headers" :data="data" />
    <Pagination :data="pagination" />
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  async asyncData({ app }) {
    const res = await app.$axios.get("/medicine");
    console.log(res.data);
    const data = res.data.map((item) => {
      return {
        id: item._id,
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
};
</script>
