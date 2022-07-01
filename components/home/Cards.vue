<template>
  <div
    class="border rounded-lg px-4 pt-4 border-gray-400 grid gap-4 text-gray-400 hover:bg-black hover:text-white cursor-pointer"
    @mouseenter="hover"
    @mouseleave="leave"
  >
    <div class="flex justify-between">
      <div>
        <h1
          class="text-xl font-bold"
          :class="{ 'text-white': item.isHover, 'text-black': !item.isHover }"
        >
          120
        </h1>
        <p class="text-lg">Total {{ item.title }}</p>
      </div>
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    </div>
    <button class="py-4 border-t">View List</button>
  </div>
</template>

<script>
export default {
  name: "Cards",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    hover() {
      this.$emit("hover");
    },
    leave() {
      this.$emit("leave");
    },
  },
};
</script>
