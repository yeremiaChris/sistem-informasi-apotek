<template>
  <div class="fixed bottom-4 top-20 right-4 gap-10">
    <button
      type="button"
      class="items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-label="going-up"
      @click="scrollDown"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
        />
      </svg>
    </button>
    <button
      type="button"
      class="items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-label="going-up"
      @click="scrollUp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 11l7-7 7 7M5 19l7-7 7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    scrollUp() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    scrollDown() {
      const main = window.document.querySelector("#content");
      window.scrollTo({
        top: main.scrollHeight,
        behavior: "smooth",
      });
    },
  },
};
</script>
