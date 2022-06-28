<template>
  <div>
    <div v-if="isButton" class="flex justify-end mb-12">
      <button
        type="button"
        class="inline-flex gap-3 items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
            clip-rule="evenodd"
          />
        </svg>
        Cetak
      </button>
    </div>
    <div class="flex items-center mb-12">
      <img src="/apotek.png" class="h-20 w-20 rounded-full bg-gray-400" />

      <div class="text-center w-full">
        <h1 class="text-2xl font-bold">APOTEK PONTJOL</h1>
        <h1 class="text-2xl font-bold">{{ title }}</h1>
        <p>
          Jl. Imam Bonjol No.31, Purwosari, Kec. Semarang Utara, Kota Semarang,
          Jawa Tengah 50172
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isButton: {
      type: Boolean,
      default: () => true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  name: "Kop",
};
</script>
