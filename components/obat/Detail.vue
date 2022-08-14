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
        {{ data.purchasePrice ? data.purchasePrice.toLocaleString() : "-" }}
      </p>
      <div class="grid grid-cols-2 gap-6 mt-5">
        <div>
          <p class="mt-3 font-bold text-xl">Uang Bayar</p>
          <p class="mt-3 font-bold text-xl">Total Bayar</p>
          <p class="text-xl mt-3 font-bold">Kembalian</p>
        </div>
        <div>
          <p class="mt-3 font-bold text-xl">
            {{ !uangBayar ? 0 : parseInt(uangBayar).toLocaleString() }}
          </p>
          <p class="mt-3 font-bold text-xl">
            {{ total.toLocaleString() }}
          </p>
          <p class="text-xl mt-3 font-bold">
            {{ kembalian.toLocaleString() }}
          </p>
        </div>
      </div>
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
            this.data.purchasePrice * this.value;
      return !total ? 0 : total;
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
          total: this.value * this.data.purchasePrice,
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
          value = this.dataTable.map((item) => ({
            ...item,
            total: obj.total,
            jumlahBeli:
              el._id === obj._id && el.supplier._id === obj.supplier._id
                ? parseInt(item.jumlahBeli) + parseInt(obj.jumlahBeli)
                : item.jumlahBeli,
          }));
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
        this.uangBayar = 0;
        this.$refs.formPembelian.reset(); // This will clear that form
      } else {
        if (this.isEmptyObject) {
          const payload = {
            value: "Field ini harus diisi",
            props: "produkError",
          };
          this.$store.commit("setProps", payload);
        }
        if (isEmptyObject(this.supplier)) {
          const payload = {
            value: "Field ini harus diisi",
            props: "supplierError",
          };
          this.$store.commit("setProps", payload);
        }
      }
      this.value = 1;
    },

    async buy() {
      if (this.dataTable.length) {
        if (this.uangBayar < this.total || this.uangBayar === 0) {
          this.error = {
            ...this.error,
            uangBayar:
              "Field ini harus diisi dan harus lebih besar atau sama dengan total harga.",
          };
        } else {
          console.log(this.dataTable);
          for (let index = 0; index < this.dataTable.length; index++) {
            const body = {
              ...this.dataTable[index],
              jumlahBeli: parseInt(this.dataTable[index].jumlahBeli),
              total: this.dataTable[index].total,
              supplier: this.dataTable[index].supplier,
            };
            await this.$axios.post("/pembelian", body);
          }

          const supplierError = {
            value: "",
            props: "supplierError",
          };
          this.$store.commit("setProps", supplierError);
          const productError = {
            value: "",
            props: "produkError",
          };
          this.$store.commit("setProps", productError);

          window.scrollTo({ top: 0, behavior: "smooth" });

          // reset form
          this.$emit("setProps", { data: {}, props: "detail" });
          this.$emit("setProps", { data: {}, props: "supplierData" });
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
      } else if (this.dataTable.length && this.uangBayar < this.total) {
        this.error = {
          ...this.error,
          uangBayar:
            "Field ini harus diisi dan harus lebih besar atau samadengan total harga.",
        };
      } else if (
        (this.isEmptyObject ||
          isEmptyObject(this.supplier) ||
          this.uangBayar < this.total ||
          this.uangBayar === 0) &&
        !this.dataTable.length
      ) {
        // product empty
        if (this.isEmptyObject) {
          const payload = {
            value: "Field ini harus diisi",
            props: "produkError",
          };
          this.$store.commit("setProps", payload);
        }

        // supplier empty
        if (isEmptyObject(this.supplier)) {
          const payload = {
            value: "Field ini harus diisi",
            props: "supplierError",
          };
          this.$store.commit("setProps", payload);
        }

        // uang bayar empty
        console.log(parseInt(this.uangBayar) < parseInt(this.total));
        if (
          parseInt(this.uangBayar) < parseInt(this.total) ||
          this.uangBayar === 0
        ) {
          this.error = {
            ...this.error,
            uangBayar:
              "Field ini harus diisi dan harus lebih besar dari total harga.",
          };
        }
      }

      if (
        !this.isEmptyObject &&
        !isEmptyObject(this.supplier) &&
        this.uangBayar >= this.total &&
        !this.dataTable.length
      ) {
        const body = {
          ...this.data,
          jumlahBeli: parseInt(this.value),
          supplier: this.supplier,
          total: this.total,
        };
        console.log(body);
        await this.$axios.post("/pembelian", body);

        window.scrollTo({ top: 0, behavior: "smooth" });

        // reset form
        this.$emit("setProps", { data: {}, props: "detail" });
        this.$emit("setProps", { data: {}, props: "supplierData" });
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
        this.temp = 1;
        // last reset form
      }

      if (
        !this.isEmptyObject &&
        !isEmptyObject(this.supplier) &&
        this.uangBayar >= this.total &&
        this.dataTable.length
      ) {
        for (let index = 0; index < this.dataTable.length; index++) {
          const body = {
            ...this.dataTable[index],
            jumlahBeli: parseInt(this.dataTable[index].jumlahBeli),
            total: this.dataTable[index].total,
            supplier: this.dataTable[index].supplier,
          };
          await this.$axios.post("/pembelian", body);
        }

        const body = {
          ...this.data,
          jumlahBeli: parseInt(this.value),
          supplier: this.supplier,
          total: this.total,
        };
        await this.$axios.post("/pembelian", body);

        const supplierError = {
          value: "",
          props: "supplierError",
        };
        this.$store.commit("setProps", supplierError);
        const productError = {
          value: "",
          props: "produkError",
        };
        this.$store.commit("setProps", productError);

        window.scrollTo({ top: 0, behavior: "smooth" });

        // reset form
        this.$emit("setProps", { data: {}, props: "detail" });
        this.$emit("setProps", { data: {}, props: "supplierData" });
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
      }
    },
  },
};
</script>
