<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Transaksi Penjualan</h1>
    <FormsSingleSelect
      label="Pilih produk"
      class="mb-3"
      :items="products"
      @input="handleChangeSelect($event, '/medicine/', 'detailProduct')"
    />
    <DisplayDetail title="produk" :data="detailProduct" />

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
    <div class="flex gap-3 justify-end">
      <FormsButton
        @submit="submit"
        className="mt-10 self-end bg-red-300 hover:bg-red-400 text-red-700"
        label="Reset"
        type="button"
      />
      <FormsButton
        @submit="submit"
        className="mt-10 self-end  bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
        label="Submit"
        type="button"
      />
    </div>
  </div>
</template>

<script>
import { fields, fieldState } from "@/helpers/fields/pembelian";
import isEmptyObject from "@/helpers/isEmptyObject.js";

export default {
  name: "TransaksiPenjualanComponent",
  data() {
    return {
      name: "",
      fields,
      fieldState,
      products: [],
      detailProduct: {},
    };
  },
  async fetch() {
    this.getSelectData();
  },
  methods: {
    async getSelectData() {
      try {
        const res = await this.$axios.get("/medicine/select-data");
        this.products = res.data.map((item) => {
          return {
            ...item,
            value: item._id,
          };
        });
      } catch {}
    },
    submit() {
      //
    },
    async handleChangeSelect(id, url, props) {
      if (id) {
        try {
          const res = await this.$axios.get(url + id);
          this[props] = res.data;
        } catch (error) {}
      } else {
        this.detailProduct = {};
      }
    },
  },

  computed: {
    isEmptyObject() {
      return isEmptyObject(this.detailProduct);
    },
    isEmptyObjectSupplier() {
      return isEmptyObject(this.detailSupplier);
    },
  },
};
</script>
