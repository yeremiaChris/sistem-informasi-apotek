<template>
  <div class="bg-light-gray -mx-5 md:-mx-10 pt-50px px-10 pb-41px">
    <h1 v-if="error.statusCode === 500" class="text-26px mb-5">
      500 Internal Server Error
    </h1>
    <h1 v-else class="text-26px mb-5">
      Maaf, kami tidak dapat menemukan halamannya
    </h1>
    <p>
      Sepertinya halaman yang anda cari tidak tersedia, silakan coba lagi dan
      coba kunjungi
      <NuxtLink to="/" class="border-b text-blue-600 border-blue-600"
        >Beranda</NuxtLink
      >
      kami
    </p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>
