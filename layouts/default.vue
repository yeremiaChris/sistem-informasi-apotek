<template>
  <div>
    <!-- Static sidebar for desktop -->
    <Sidebar />

    <div class="md:pl-64 flex flex-col flex-1">
      <!-- header -->
      <Header />

      <!-- content -->
      <main class="flex-1">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <Nuxt class="mt-10" />
            <!-- Replace with your content -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {};
</script>
