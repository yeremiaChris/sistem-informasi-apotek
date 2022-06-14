<template>
  <div>
    <!-- Static sidebar for desktop -->
    <Sidebar />

    <div class="md:pl-64 flex flex-col flex-1 bg-gray-100 h-screen">
      <!-- header -->
      <Header />

      <!-- content -->
      <main class="flex-1">
        <div class="px-4 pt-10 sm:px-6 md:px-8 bg-white h-full pb-3">
          <Spinner v-if="onRequesting" />
          <Notification />
          <div class="max-w-1020px m-auto">
            <Nuxt id="content" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Notification from "../components/Notification.vue";
export default {
  components: { Notification },
  computed: {
    onRequesting() {
      return this.$store.state.isRequesting;
    },
  },
};
</script>
