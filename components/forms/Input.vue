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
        class="shadow-sm border px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
      default: () => "",
    },
    type: {
      type: String,
      default: () => "",
    },
    value: {
      type: String,
      default: () => "",
    },
  },
  methods: {
    handleChange(e) {
      if (this.type === "file") {
        this.$emit("setFile", e);
      } else {
        this.$emit("input", e.target.value);
      }
    },
  },
};
</script>
