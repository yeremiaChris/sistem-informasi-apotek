<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="mt-1">
      <input
        v-if="type !== 'number'"
        :type="type"
        :name="name"
        :id="name"
        class="shadow-sm border px-3 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
        :class="customClass"
        :placeholder="placeholder"
        :value="type === 'date' ? date : value"
        @input="handleChange"
      />
      <input
        v-else
        type="number"
        :name="name"
        :id="name"
        min="0"
        class="shadow-sm border px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md"
        :class="customClass"
        :placeholder="placeholder"
        :value="value"
        @keypress="isNumber($event)"
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
      default: () => "text",
    },
    type: {
      type: String,
      default: () => "",
    },
    value: {
      type: String,
      default: () => "",
    },
    customClass: {
      type: String,
      default: () => "",
    },
  },
  computed: {
    date() {
      return this.$dayjs(this.value).format("YYYY-MM-DD").toString();
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

    isNumber(e) {
      const charCode = e.which ? e.which : e.keyCode;

      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>
