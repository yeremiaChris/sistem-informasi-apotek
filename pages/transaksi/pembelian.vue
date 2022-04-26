<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Transaksi Pembelian</h1>
    <FormsFloatButton />
    <div class="px-6 py-6 mb-16 border-2">
      <p>Total</p>
      <p class="text-3xl mb-8">Rp. {{ total.toLocaleString() }}</p>
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
      <p class="text-3xl">Rp. {{ change.toLocaleString() }}</p>
      <div class="flex gap-3 justify-end">
        <FormsButton
          @submit="reset"
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
        <div v-if="item.type === 'select'">
          <FormsSingleSelect
            :label="item.title"
            v-model="item.value"
            class="mb-3"
            :items="item.title.includes('produk') ? products : supplier"
          />
          <p>{{ item.error }}</p>
        </div>
        <div v-else>
          <FormsInput
            :type="item.type"
            :label="item.title"
            name="name"
            v-model="item.value"
            :placeholder="item.title + '...'"
          />
          <p
            v-if="item.error && item.value === '0'"
            class="text-sm text-red-700"
          >
            {{ item.error }}
          </p>
        </div>
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
    total() {
      const sum = this.fields.reduce((accumulator, object) => {
        return accumulator + object[0].value * object[2].value;
      }, 0);
      return sum;
    },
    change() {
      const change = this.fieldState2.amount - this.total;

      return this.fieldState2.amount === 0 ? 0 : change;
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
            value: item.price.toString(),
          };
        });

        this.supplier = res2.data.map((item) => {
          return {
            ...item,
            value: item._id.toString(),
          };
        });

        // set default value for the first form
        this.fields = this.fields.map((item, index) =>
          index === 0
            ? [
                {
                  title: "Pilih produk",
                  id: "product",
                  error: "",
                  value: this.products[0].value,
                  type: "select",
                },
                {
                  title: "Pilih supplier",
                  id: "supplier",
                  error: "",
                  value: this.supplier[0].value,
                  type: "select",
                },
                {
                  title: "Jumlah pembelian",
                  value: "0",
                  error: "",
                  id: "purchaseAmount",
                  type: "number",
                },
              ]
            : item
        );
      } catch {}
    },

    submit() {
      //
    },

    addForm(id) {
      const main = window.document.querySelector("#content");
      window.scrollTo({
        top: main.scrollHeight,
        behavior: "smooth",
      });
      if (parseInt(this.fields[0][2].value) > 0) {
        const { products, supplier } = this;
        const newEl = [
          {
            title: "Pilih produk",
            id: "product",
            value: products[0].value,
            error: "",
            type: "select",
          },
          {
            title: "Pilih supplier",
            id: "supplier",
            error: "",
            value: supplier[0].value,
            type: "select",
          },
          {
            title: "Jumlah pembelian",
            value: "0",
            error: "",
            id: "purchaseAmount",
            type: "number",
          },
        ];
        this.fields = this.fields = [newEl, ...this.fields];
      } else {
        this.fields[0][2].error = this.fields[0][2].error =
          "This field is required.";
      }
    },

    deleteForm(index) {
      this.fields = this.fields.filter((item, idx) => idx !== index);
    },

    reset() {
      this.$nuxt.refresh();
    },
  },
};
</script>
