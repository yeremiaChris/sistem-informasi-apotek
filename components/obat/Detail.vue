<template>
  <div
    class="mt-3 flex justify-between border border-gray-300 px-4 py-4 shadow-lg"
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
        :class="{ 'cursor-not-allowed': isEmptyObject }"
        placeholder="Quantity..."
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
        :class="{ 'cursor-not-allowed': isEmptyObject }"
        placeholder="Quantity..."
      />
      <p class="text-right mt-3 font-bold text-xl">
        Total Rp. {{ total.toLocaleString() }}
      </p>
      <div class="flex justify-end mt-4 gap-4">
        <FormsButton label="Beli" :is-out-lined="true" @submit="buy" />
        <FormsButton label="Tambah" @submit="add" />
      </div>
    </div>
  </div>
</template>

<script>
import isEmptyObject from "@/helpers/isEmptyObject.js";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },

    supplier: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      temp: 1,
      uangBayar: 0,
    };
  },

  computed: {
    value: {
      set(value) {
        this.temp = value;
      },
      get() {
        return isEmptyObject(this.data) ? 0 : this.temp;
      },
    },

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

    kembalian() {
      return parseInt(this.total) <= parseInt(this.uangBayar)
        ? parseInt(this.uangBayar) - parseInt(this.total)
        : 0;
    },
  },

  methods: {
    add() {
      if (!this.isEmptyObject && !isEmptyObject(this.supplier)) {
        const { total, supplier } = this;
        const obj = { ...this.data, total, jumlahBeli: this.value, supplier };
        const isFilled = this.dataTable.some(
          (el) => el._id === obj._id && el.supplier._id === obj.supplier._id
        );
        let value = [];
        if (!isFilled) {
          value = [obj, ...this.dataTable];
        } else {
          value = this.dataTable;
        }
        console.log(isFilled);
        const payload = {
          value: value.map((item, index) => {
            return {
              ...item,
              id: index,
            };
          }),
          props: "dataTable",
        };
        this.$store.commit("setProps", payload);
      } else {
        if (this.isEmptyObject) {
          const payload = {
            value: "This field is required",
            props: "produk",
          };
          this.$store.commit("setProps", payload);
        }
        if (isEmptyObject(this.supplier)) {
          const payload = {
            value: "This field is required",
            props: "supplier",
          };
          this.$store.commit("setProps", payload);
        }
      }
    },

    async buy() {
      if (this.isEmptyObject && isEmptyObject(this.supplier)) {
        if (this.isEmptyObject) {
          const payload = {
            value: "This field is required",
            props: "produk",
          };
          this.$store.commit("setProps", payload);
        }
        if (isEmptyObject(this.supplier)) {
          const payload = {
            value: "This field is required",
            props: "supplier",
          };
          this.$store.commit("setProps", payload);
        }
      } else {
        console.log("masuk");
        const data = {
          supplier: this.dataTable,
          medicine: this.dataTable,
        };
        const res = await this.$axios.post("/pembelian", {
          laporan: this.dataTable,
          title: "Laporan " + this.$dayjs().format("DD MMM YYYY Pukul HH:mm"),
        });
        console.log(res);
      }
    },
  },
};
</script>
