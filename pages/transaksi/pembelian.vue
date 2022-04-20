<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Transaksi Pembelian</h1>

    <div class="px-6 py-6 mb-16 border-2">
      <p>Total</p>
      <p class="text-3xl mb-8">Rp. 0</p>
      <FormsInput
        v-for="(item, index) in fields2"
        :key="index"
        :type="item.type"
        class="mb-4"
        custom-class="text-5xl h-20"
        :label="item.title"
        name="name"
        v-model="fieldState2[item.id]"
        :placeholder="item.title + '...'"
      />
      <p class="mt-8">Kembalian</p>
      <p class="text-3xl">Rp. 0</p>
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
          label="Bayar"
          type="button"
        />
      </div>
    </div>
    <div class="flex justify-end">
      <button class="text-gray-600 hover:underline" @click="addForm">
        + Tambah produk beli.
      </button>
    </div>
    <div v-for="(items, index) in fields" :key="index">
      <form v-for="(item, idx) in items" :key="idx">
        <FormsSingleSelect
          v-if="item.type === 'select'"
          :label="item.title"
          v-model="item.value"
          class="mb-3"
          :items="supplier"
        />
        <FormsInput
          v-else
          :type="item.type"
          :label="item.title"
          name="name"
          v-model="item.value"
          :placeholder="item.title + '...'"
        />
      </form>
      <FormsButton
        v-if="fields.length > 1"
        @submit="deleteForm(index)"
        className="mt-3 mb-4 self-end bg-red-300 hover:bg-red-400 text-red-700"
        label="Delete"
        type="button"
      />
    </div>
  </div>
</template>

<script>
import {
  fields,
  fieldState,
  fieldState2,
  fields2,
} from "@/helpers/fields/pembelian";
import isEmptyObject from "@/helpers/isEmptyObject.js";

export default {
  name: "TransaksiComponent",
  data() {
    return {
      name: "",
      fields,
      fieldState2,
      fields2,
      fieldState,
      products: [],
      supplier: [],
    };
  },

  async fetch() {
    this.getSelectData();
  },

  computed: {
    isEmptyObject() {
      return isEmptyObject(this.detailProduct);
    },
    isEmptyObjectSupplier() {
      return isEmptyObject(this.detailSupplier);
    },
  },

  methods: {
    async getSelectData() {
      try {
        const res = await this.$axios.get("/medicine/select-data");
        const res2 = await this.$axios.get("/supplier/select-data");
        this.products = res.data.map((item) => {
          return {
            ...item,
            value: item._id,
          };
        });
        this.supplier = res2.data.map((item) => {
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
    addForm() {
      const main = window.document.querySelector("#content");
      window.scrollTo({
        top: main.scrollHeight,
        behavior: "smooth",
      });
      this.fields = this.fields = [fields[0], ...this.fields];
    },
    deleteForm(index) {
      this.fields = this.fields.filter((item, idx) => idx !== index);
    },
  },
};
</script>
