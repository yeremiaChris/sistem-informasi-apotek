<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="mt-1">
      <input
        :type="type"
        :name="name"
        :id="name"
        class="shadow-sm border px-3 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
        :placeholder="placeholder"
        :value="value"
        @input="handleChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: () => "",
    },
    value: {
      type: Number,
      default: () => 0,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
