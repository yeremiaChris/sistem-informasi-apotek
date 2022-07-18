<template>
  <div
    aria-live="assertive"
    class="fixed transform duration-300 my-12 inset-0 flex translate-x-0 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
    :class="{ 'translate-x-1/2': !this.success }"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->

      <div
        class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="green"
                viewBox="0 0 24 24"
                stroke="white"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                Successfully
                {{
                  $route.path.includes("transaksi") ? " transactions" : " saved"
                }}
                !
              </p>
              <p class="mt-1 text-sm text-gray-500">
                All data will be stored in report page.
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                :disabled="disabled"
                @click="close"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
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
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  data() {
    return {
      show: true,
    };
  },
  watch: {
    "$store.state.success"() {
      setTimeout(() => {
        const payload3 = {
          value: false,
          props: "success",
        };
        this.$store.commit("setProps", payload3);
      }, 3000);
    },
  },
  computed: {
    success() {
      return this.$store.state.success;
    },
    disabled() {
      return this.$store.state.isRequesting;
    },
  },

  methods: {
    close() {
      const payload = {
        value: payload,
        props: "success",
      };
      this.$store.commit("setProps", payload);
    },
  },
};
</script>
