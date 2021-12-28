<template>
  <div>
    <ObatHeader />
    <ObatTable />
    <Pagination :data="pagination" />
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      pagination: {
        page: 1,
        totalPage: 2,
      },
    };
  },
};
</script>
