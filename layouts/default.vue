<template>
  <div>
    <!-- Static sidebar for desktop -->
    <Sidebar />

    <div class="md:pl-64 flex flex-col flex-1 bg-gray-100 h-screen">
      <!-- header -->
      <Header />

      <!-- content -->
      <main class="flex-1">
        <div class="px-4 pt-10 sm:px-6 md:px-8 bg-white pb-3">
          <Spinner v-if="onRequesting" />

          <Nuxt />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    onRequesting() {
      return this.$store.state.isRequesting;
    },
  },
};
</script>
