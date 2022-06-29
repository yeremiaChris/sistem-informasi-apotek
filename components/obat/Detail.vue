<template>
  <form
    ref="formPembelian"
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
        :disabled="isEmptyObject || !dataTable.length"
        type="number"
        min="0"
        name="product"
        id="product"
        class="shadow-sm mt-1 border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
        :class="{ 'cursor-not-allowed': isEmptyObject || !dataTable.length }"
        placeholder="Quantity..."
        @keypress="isNumber"
      />
      <p class="mt-3">Uang bayar</p>
      <input
        v-model="uangBayar"
        type="number"
        min="0"
        name="product"
        id="product"
        class="shadow-sm mt-1 border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
        placeholder="Quantity..."
        @keypress="isNumber"
      />
      <p v-if="error.uangBayar" class="text-sm text-red-500 py-2">
        {{ error.uangBayar }}
      </p>
      <p class="text-right mt-3 font-bold text-xl">
        Total Rp. {{ total.toLocaleString() }}
      </p>
      <div class="flex justify-end mt-4 gap-4">
        <FormsButton label="Beli" type="submit" :is-out-lined="true" />
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

    supplier: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      temp: 1,
      uangBayar: 0,
      error: {},
      headers: [
        "Nama obat",
        "Tipe",
        "Satuan",
        "Harga per satuan",
        "Stok",
        "Tanggal",
        "Total harga",
        "Jumlah beli",
        "Nama supplier",
      ],
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
      const total =
        this.isEmptyObject && !this.dataTable.length
          ? 0
          : this.isEmptyObject && this.dataTable.length
          ? this.dataTable.reduce((a, c) => a + c.total, 0)
          : this.dataTable.reduce((a, c) => a + c.total, 0) +
            this.data.price * this.value;
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

  watch: {
    uangBayar() {
      if (this.uangBayar >= this.total) {
        this.error = { uangBayar: "" };
      }
    },
  },

  methods: {
    isNumber(e) {
      const charCode = e.which ? e.which : e.keyCode;

      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
      } else {
        return true;
      }
    },

    add() {
      if (!this.isEmptyObject && !isEmptyObject(this.supplier)) {
        const { supplier } = this;
        const obj = {
          ...this.data,
          total: this.value * this.data.price,
          jumlahBeli: this.value,
          supplier,
        };
        const isFilled = this.dataTable.some(
          (el) => el._id === obj._id && el.supplier._id === obj.supplier._id
        );
        let value = [];
        if (!isFilled) {
          value = [obj, ...this.dataTable];
        } else {
          value = this.dataTable;
        }
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
        // reset form
        this.$emit("setProps", { data: {}, props: "detail" });
        this.$emit("setProps", { data: "", props: "product" });
        this.$emit("setProps", { data: "", props: "supplier" });
        this.$refs.formPembelian.reset(); // This will clear that form
      } else {
        if (this.isEmptyObject) {
          const payload = {
            value: "This field is required",
            props: "produkError",
          };
          this.$store.commit("setProps", payload);
        }
        if (isEmptyObject(this.supplier)) {
          const payload = {
            value: "This field is required",
            props: "supplierError",
          };
          this.$store.commit("setProps", payload);
        }
      }
    },

    async buy() {
      if (
        (this.isEmptyObject && isEmptyObject(this.supplier)) ||
        this.uangBayar < this.total ||
        this.uangBayar === 0
      ) {
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
        if (this.uangBayar < this.total || this.uangBayar === 0) {
          console.log(this.uangBayar < this.total || this.uangBayar === 0);
          if (this.uangBayar < this.total) {
            this.error = { uangBayar: "This field must be more than total." };
          } else {
            this.error = { uangBayar: "This field is required." };
          }
        }
      } else {
        const { total, supplier } = this;
        const obj = {
          ...this.data,
          total,
          jumlahBeli: this.value,
          supplier,
        };

        // post data
        const data = await this.$axios.post("/pembelian", {
          laporan: this.dataTable.length ? this.dataTable : obj,
          uangBayar: this.uangBayar,
          total: this.total,
          kembalian: this.kembalian,
          title: "Laporan " + this.$dayjs().format("DD MMM YYYY Pukul HH:mm"),
        });

        const payloadPrint = {
          props: "report",
          value: data.data,
        };
        this.$store.commit("setProps", payloadPrint);

        this.$emit("print");

        // reset form
        this.$emit("setProps", { data: {}, props: "detail" });
        this.$emit("setProps", { data: "", props: "product" });
        this.$emit("setProps", { data: "", props: "supplier" });
        const payload = {
          value: [],
          props: "dataTable",
        };
        this.$store.commit("setProps", payload);
        const payload2 = {
          value: true,
          props: "success",
        };
        this.$store.commit("setProps", payload2);
        setTimeout(() => {
          const payload3 = {
            value: false,
            props: "success",
          };
          this.$store.commit("setProps", payload3);
        }, 3000);
        this.$refs.formPembelian.reset(); // This will clear that form
        this.uangBayar = 0;
        // last reset form
      }
    },
  },
};
</script>
