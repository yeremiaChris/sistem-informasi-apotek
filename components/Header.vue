<template>
  <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
    <!-- mobile to open sidebar -->
    <button
      type="button"
      :disabled="disabled"
      class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
    >
      <span class="sr-only">Open sidebar</span>
      Logo
    </button>

    <!-- search -->
    <div class="flex-1 px-4 flex justify-end">
      <!-- profile -->
      <div class="ml-4 flex items-center md:ml-6">
        <img
          class="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  computed: {
    disabled() {
      return this.$store.state.isRequesting;
    },
  },
};
</script>
