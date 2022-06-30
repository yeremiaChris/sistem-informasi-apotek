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
        v-model="jumlah"
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
        type="number"
        min="0"
        name="product"
        id="product"
        class="shadow-sm mt-1 border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
        placeholder="Quantity..."
        @keypress="onlyNumber"
      />
      <p v-if="error.uangBayar" class="text-sm text-red-500 py-2">
        {{ error.uangBayar }}
      </p>
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
      uangBayar: 0,
      jumlahBeli: 1,
      error: { uangBayar: "" },
    };
  },

  watch: {
    uangBayar() {
      if (this.uangBayar >= this.total) {
        this.error.uangBayar = "";
      }
    },
  },

  computed: {
    kembalian() {
      return parseInt(this.total) <= parseInt(this.uangBayar)
        ? parseInt(this.uangBayar) - parseInt(this.total)
        : 0;
    },

    report() {
      return this.$store.state.report;
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
            parseInt(this.data.price) * this.jumlahBeli;
      return total;
    },

    dataTable() {
      return this.$store.state.dataTable;
    },

    jumlah: {
      set(value) {
        this.jumlahBeli = value;
      },
      get() {
        return isEmptyObject(this.data) ? 0 : this.jumlahBeli;
      },
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
          ...this.data,
          jumlahBeli: this.jumlahBeli,
          isRecipe: this.isRecipe,
          total: this.data.price * this.jumlahBeli,
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
            } else {
              this.$store.commit("setProps", payload);
              this.$emit("setProps", { props: "detail", data: {} });
              this.$emit("setProps", { props: "product", data: "" });
              this.$emit("setProps", { props: "isRecipe", data: false });
              this.$refs.formPenjualan.reset(); // This will clear that form
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

    async buy() {
      const payload = {
        value: this.dataTable,
        props: "dataTable",
      };
      if (
        (this.isEmptyObject && !this.dataTable.length) ||
        this.uangBayar < this.total
      ) {
        if (this.isEmptyObject && !this.dataTable.length) {
          const payload = {
            props: "produkError",
            value: "This field is required.",
          };
          this.$store.commit("setProps", payload);
        }
        if (this.uangBayar < this.total) {
          this.error.uangBayar =
            "This field must be equall or more than total.";
        }
        if (!this.dataTable.length && this.isEmptyObject) {
          const payload = {
            props: "produkError",
            value: "You should pick at least one product.",
          };
          this.$store.commit("setProps", payload);
        }
      } else {
        this.$store.commit("setProps", payload);
        this.$emit("setProps", { props: "detail", data: {} });
        this.$emit("setProps", { props: "product", data: "" });
        this.$emit("setProps", { props: "isRecipe", data: false });
        this.$refs.formPenjualan.reset(); // This will clear that form
        const obj = {
          ...this.data,
          jumlahBeli: this.jumlahBeli,
          isRecipe: this.isRecipe,
          total: this.data.price * this.jumlahBeli,
        };

        // post data
        const datas = [obj, ...this.dataTable];
        console.log(this.dataTable);
        const data = await this.$axios.post("/penjualan", {
          laporan:
            this.dataTable.length && !this.isEmptyObject
              ? datas
              : this.dataTable.length && this.isEmptyObject
              ? this.dataTable
              : obj,
          uangBayar: this.uangBayar,
          total: this.total,
          kembalian: this.kembalian,
          title: "Laporan " + this.$dayjs().format("DD MMM YYYY Pukul HH:mm"),
        });
        const payload2 = {
          value: true,
          props: "success",
        };
        this.$store.commit("setProps", payload2);
        const payload3 = {
          value: [],
          props: "dataTable",
        };
        this.$store.commit("setProps", payload3);
        const payloadPrint = {
          props: "report",
          value: data.data,
        };
        this.$store.commit("setProps", payloadPrint);
        this.$emit("print");
        setTimeout(() => {
          const payload3 = {
            value: false,
            props: "success",
          };
          this.$store.commit("setProps", payload3);
        }, 3000);
        this.$refs.formPenjualan.reset(); // This will clear that form
        this.uangBayar = 0;
        // last reset form
      }
    },
  },
};
</script>
