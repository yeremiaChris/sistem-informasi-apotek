<template>
  <div>
    <p class="block text-sm font-medium text-gray-700 mb-2">Resep dokter</p>
    <div
      :class="[
        value ? 'bg-indigo-600' : 'bg-gray-200',
        'relative mb-4 inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
      ]"
      @click="toggle"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="[
          value ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
        ]"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      enabled: false,
    };
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
  },
};
</script>
