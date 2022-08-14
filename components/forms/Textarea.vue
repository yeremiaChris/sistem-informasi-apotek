<template>
  <div class="mb-3">
    <label for="comment" class="block mb-2 text-sm font-medium text-gray-700">{{
      title
    }}</label>
    <div class="mt-1">
      <textarea
        rows="4"
        :placeholder="title + ' ...'"
        name="comment"
        id="comment"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        :value="value"
        @input="handleChange"
      />
    </div>
    <p class="text-sm mt-2 text-red-600" v-if="error.length">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleChange(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
