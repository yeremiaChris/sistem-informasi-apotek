<template>
  <button
    :type="type"
    @click="handleClick"
    class="inline-flex buttons items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    :class="className"
    :disabled="disabled"
  >
    {{ label }} {{ disabled }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: () => "button",
    },
    className: {
      type: String,
      default: () => "bg-indigo-600 hover:bg-indigo-700 text-white",
    },
  },
  computed: {
    disabled() {
      return this.$store.state.isRequesting;
    },
  },
  methods: {
    handleClick() {
      this.$emit("submit");
    },
  },
};
</script>
<style scoped>
.buttons:disabled {
  @apply bg-gray-300 text-gray-100 cursor-not-allowed;
}
</style>
