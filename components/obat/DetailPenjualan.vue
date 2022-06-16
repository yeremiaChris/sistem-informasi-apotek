<template>
  <form
    ref="formPenjualan"
    class="mt-3 flex justify-between border border-gray-300 px-4 py-4 shadow-lg"
    @submit.prevent="buy"
  >
    <div>
      <p>Nama obat</p>
      <p class="font-bold">{{ data.name || "-" }}</p>
      <p>Satuan</p>
      <p class="font-bold">{{ data.unit || "-" }}</p>
      <p>Harga</p>
      <p class="font-bold">
        {{ data.price ? data.price.toLocaleString() : "-" }}
      </p>
      <p class="text-xl mt-5 font-bold">
        Kembalian Rp {{ kembalian.toLocaleString() }}
      </p>
    </div>

    <div>
      <p class="my-1">Jumlah beli</p>
      <input
        v-model="value"
        :disabled="isEmptyObject"
        type="number"
        min="0"
        name="product"
        id="product"
        class="shadow-sm mt-1 border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
        placeholder="Quantity..."
        @keypress="onlyNumber"
      />
      <p class="mt-3">Uang bayar</p>
      <input
        v-model="uangBayar"
        :disabled="isEmptyObject"
        type="number"
        min="0"
        name="product"
        id="product"
        class="shadow-sm mt-1 border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
        placeholder="Quantity..."
        @keypress="onlyNumber"
      />
      <p v-if="error.uangBayar" class="text-sm text-red-500 py-2">p</p>
      <p class="text-right mt-3 font-bold text-xl">
        Total Rp. {{ total.toLocaleString() }}
      </p>
      <div class="flex justify-end mt-4 gap-4">
        <FormsButton label="Bayar" type="submit" :is-out-lined="true" />
        <FormsButton label="Tambah" @submit="add" />
      </div>
    </div>
  </form>
</template>

<script>
import isEmptyObject from "@/helpers/isEmptyObject.js";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    recipiDataError: {
      type: Object,
      required: true,
    },
    recipiData: {
      type: Object,
      required: true,
    },
    isRecipe: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      temp: 1,
      uangBayar: 0,
      kembalian: 0,
      value: 0,
      error: {},
    };
  },

  computed: {
    isEmptyObject() {
      return isEmptyObject(this.data);
    },

    total() {
      const total = this.isEmptyObject
        ? 0
        : this.value * parseInt(this.data.price);
      return total;
    },

    dataTable() {
      return this.$store.state.dataTable;
    },
  },

  methods: {
    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },

    submit() {
      //
    },
    add() {
      //
      if (!this.isEmptyObject) {
        const { name, _id, price } = this.data;
        const obj = {
          _id,
          name,
          price: price.toLocaleString(),
          jumlahBeli: this.value.toLocaleString(),
          total: this.total.toLocaleString(),
          isRecipe: this.isRecipe,
        };
        const payload = {
          value: [obj, ...this.dataTable],
          props: "dataTable",
        };

        if (this.isRecipe) {
          for (const property in this.recipiData) {
            if (!this.recipiData[property].length) {
              this.$emit("setErrorRecipi", {
                props: property,
                data: "This field is required.",
              });
            }
          }
        } else {
          this.$store.commit("setProps", payload);
          this.$emit("setProps", { props: "detail", data: {} });
          this.$emit("setProps", { props: "product", data: "" });
          this.$emit("setProps", { props: "isRecipe", data: false });
          this.$refs.formPenjualan.reset(); // This will clear that form
        }
      } else {
        //
        this.$store.commit("setProps", {
          props: "produkError",
          value: "This field is required.",
        });
      }
    },
    buy() {
      //
      if (this.isEmptyObject && this.uangBayar < this.total) {
        const payload = {
          props: "produkError",
          value: "This field is required.",
        };
        this.$store.commit("setProps", payload);
        console.log(this.uangBayar < this.total);
        if (this.uangBayar < this.total) {
          this.error.uangBayar = "This field must be more than total.";
        }
      }
    },
  },
};
</script>
