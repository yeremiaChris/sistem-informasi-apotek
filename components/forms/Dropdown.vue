<template>
  <form
    ref="selectInput"
    class="relative mb-3"
    v-click-outside="hideDropdown"
    @submit.prevent="submit"
  >
    <label for="product" class="block text-sm font-medium text-gray-700">
      {{ title }}
    </label>
    <input
      type="text"
      name="product"
      id="product"
      class="shadow-sm mt-1 border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
      :placeholder="title + '...'"
      :value="value"
      @focus="showDropdown"
      @input="search"
    />

    <div
      v-if="isDropdown"
      class="absolute z-40 w-full text-gray-600 bg-white border border-b-0 border-gray-400 mt-1"
    >
      <p
        class="px-3 cursor-pointer py-2 border-b bg-gray-100 hover:bg-gray-300 border-gray-400"
      >
        Select {{ title }}...
      </p>
      <p
        v-for="(item, index) in data"
        :key="index"
        class="px-3 cursor-pointer py-2 border-b bg-gray-100 hover:bg-gray-300 border-gray-400"
        :class="{ 'bg-gray-300': value === item.title }"
        @click="handleClick(item)"
      >
        {{ item.title }}
      </p>
    </div>

    <p v-if="error.length" class="text-red-500 mt-3">{{ error }}</p>
  </form>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    error: {
      type: String,
      required: true,
    },

    endpoint: {
      type: String,
      default: () => "/medicine/",
    },
  },
  data() {
    return {
      produk: "",
      isDropdown: false,
      tempData: [],
    };
  },
  methods: {
    showDropdown() {
      this.isDropdown = true;
    },

    hideDropdown() {
      this.isDropdown = false;
    },

    handleClick(item) {
      this.$emit("input", item.title);
      this.$emit("getDetail", this.endpoint + item._id);
      this.$emit("setProps", item);
      const payload = {
        props: this.title.toLowerCase(),
        value: "",
      };
      this.$store.commit("setProps", payload);
      this.hideDropdown();
    },

    search(e) {
      this.$emit("search", e.target.value);
    },
  },
};
</script>
