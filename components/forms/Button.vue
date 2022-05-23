<template>
  <button
    :type="type"
    @click="handleClick"
    class="inline-flex buttons text items-center px-4 py-2 border transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    :class="{
      'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 ': isOutLined,
      'bg-indigo-600 hover:bg-indigo-700 text-white': !isOutLined,
    }"
    :disabled="disabled"
  >
    {{ label }}
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
    isOutLined: {
      type: Boolean,
      default: () => false,
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
