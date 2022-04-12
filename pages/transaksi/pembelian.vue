<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Transaksi Pembelian</h1>
    <FormsSingleSelect label="Pilih produk" class="mb-3" :items="products" />
    <FormsSingleSelect label="Pilih supplier" class="mb-3" :items="supplier" />
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

    <p class="mt-8">Kembalian</p>
    <p class="text-5xl">Rp. 0</p>
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
      products: [],
      supplier: [],
    };
  },
  async fetch() {
    const res = await this.$axios.get("/medicine/select-data");
    const res2 = await this.$axios.get("/supplier/select-data");
    console.log(res2.data);
    this.products = res.data;
    this.supplier = res2.data;
  },
};
</script>
