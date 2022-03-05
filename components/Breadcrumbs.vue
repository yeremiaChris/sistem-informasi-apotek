<template>
  <div class="flex">
    <p>
      {{
        urlArray
          .filter((el, index) => index !== parseInt(urlArray.length) - 1)
          .join("/")
      }}
    </p>
    <span class="mx-1">/</span>
    <p class="text-blue-600">
      {{
        urlArray
          .filter((el, index) => index === parseInt(urlArray.length) - 1)
          .join("/")
      }}
    </p>
  </div>
</template>

<script>
export default {
  name: "BreadCrumbs",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    urlArray() {
      return this.url.split("/");
    },
  },
};
</script>
