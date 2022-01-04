<template>
  <p class="text-sm text-red-600">{{ msg }}</p>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
};
</script>
