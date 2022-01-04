<template>
  <h1 class="font-bold text-xl mb-10">{{ title }}</h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
