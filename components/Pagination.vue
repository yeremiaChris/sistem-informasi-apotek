<template>
  <div class="flex mt-4 mb-8">
    <div
      class="grid items-center justify-center h-14 px-4 py-2 text-left border sm:text-sm"
    >
      <ul class="flex">
        <button
          :disabled="data.page < 2"
          class="text-dark-navy mr-5 cursor-pointer hover:text-black"
          :class="{ 'opacity-70': data.page < 2 }"
          @click="before"
        >
          Prev
        </button>

        <template
          v-if="
            (data.totalPage > 5 && data.page > data.totalPage - 3) ||
            data.page > 3
          "
        >
          <li
            class="text-black rounded-full w-6 h-6 flex items-center justify-center mr-5 cursor-pointer"
            @click="buttonPage(1)"
          >
            1
          </li>

          <div
            class="text-black rounded-full w-6 h-6 flex items-center justify-center mr-5"
          >
            ...
          </div>
        </template>

        <li
          v-for="(number, index) in numbers"
          :key="'pagination1-' + index"
          class="text-black rounded-full w-6 h-6 flex items-center justify-center mr-5 cursor-pointer"
          :class="{ 'bg-blue-600 text-white': number === data.page }"
          @click="buttonPage(number)"
        >
          {{ number }}
        </li>

        <template v-if="!(data.page > data.totalPage - 2)">
          <div
            class="text-black rounded-full w-6 h-6 flex items-center justify-center mr-5"
          >
            ...
          </div>

          <li
            class="text-black rounded-full w-6 h-6 flex items-center justify-center mr-5 cursor-pointer"
            @click="buttonPage(data.totalPage)"
          >
            {{ data.totalPage }}
          </li>
        </template>

        <!-- <li
          class="rounded-full w-6 h-6 flex items-center justify-center mr-5 text-white bg-orange-brand"
        >
          1
        </li> -->

        <button
          :disabled="data.page >= totalPage"
          class="text-dark-navy cursor-pointer hover:text-black"
          :class="{ 'opacity-70': data.page >= totalPage }"
          @click="next"
        >
          Next
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  computed: {
    totalPage() {
      return this.data.totalPage;
    },
    numbers() {
      let numbers = this.totalPage;
      const page = this.data.page;

      if (this.totalPage > 5) {
        if (page < 2) {
          // page 1
          numbers = [page, page + 1, page + 2, page + 3];
        } else if (page === 2) {
          // page 2
          numbers = [page - 1, page, page + 1, page + 2];
        } else if (page === this.totalPage) {
          // last page
          numbers = [page - 3, page - 2, page - 1, page];
        } else if (page === this.totalPage - 1) {
          // last page - 1
          numbers = [page - 2, page - 1, page, page + 1];
        } else {
          // middle page
          numbers = [page - 2, page - 1, page, page + 1];
        }
      }

      return numbers;
    },
    query() {
      return this.$route.query;
    },
    page() {
      let page = 1;

      if (this.query.page) {
        page = parseInt(this.query.page);
      }

      return page;
    },
  },
  methods: {
    buttonPage(page) {
      this.$router.push({ query: { ...this.query, page } });
    },
    next() {
      this.$router.push({ query: { ...this.query, page: this.page + 1 } });
    },
    before() {
      this.$router.push({ query: { ...this.query, page: this.page - 1 } });
    },
  },
};
</script>
