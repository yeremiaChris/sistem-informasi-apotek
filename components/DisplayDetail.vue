<template>
  <div>
    <p class="mb-3">Detail {{ title }} :</p>
    <div class="mb-3">
      <p v-if="isEmptyObject">-</p>
      <div
        v-for="(value, key, index) in data"
        class="flex gap-4"
        v-show="
          key !== 'createdAt' &&
          key !== 'updatedAt' &&
          key !== '__v' &&
          key !== '_id' &&
          key !== 'media'
        "
        :key="index"
      >
        <p>{{ key[0].toUpperCase() + key.slice(1) }}</p>
        <p v-if="key === 'image'" class="mb-3 font-bold">
          {{ value }}
        </p>
        <p v-else class="mb-3 font-bold">
          {{ value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import isEmptyObject from "@/helpers/isEmptyObject.js";

export default {
  name: "DisplayDetail",
  props: {
    data: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    isEmptyObject() {
      return isEmptyObject(this.data);
    },
  },
};
</script>
