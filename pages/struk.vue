<template>
  <div>
    <StrukKop />
    <ObatTable :headers="headers" :data="data" />
    <StrukFooter />
  </div>
</template>

<script>
export default {
  name: "Struk",

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
};
</script>
