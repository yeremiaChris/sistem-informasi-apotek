<template>
  <div>
    <FormsInput
      v-for="(item, index) in fields"
      :key="index"
      :type="item.type"
      class="mb-4"
      :label="item.title"
      name="name"
      v-model="fieldState[item.id]"
      :placeholder="item.title + '...'"
    />
  </div>
</template>

<script>
import { fields, fieldState } from "@/helpers/fields/pembelian";
export default {
  name: "TransaksiComponent",
  data() {
    return {
      name: "",
      fields,
      fieldState,
    };
  },
};
</script>
