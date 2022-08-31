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
      <h2 class="mt-4 text-2xl font-bold">
        Total {{ total.toLocaleString() }}
      </h2>
    </div>

    <div>
      <p class="my-1">Jumlah beli</p>
      <input
        v-model="value"
        type="number"
        min="0"
        name="product"
        id="product"
        class="shadow-sm mt-1 border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
        placeholder="Quantity..."
        @keypress="isNumber"
      />
      <p class="text-red-500 mt-2" v-if="errorJumlahBeli">
        {{ errorJumlahBeli }}
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
      value: 1,
      errorJumlahBeli: "",
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

  watch: {
    value() {
      this.errorJumlahBeli = "";
    },
  },

  computed: {
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
  },

  methods: {
    async buy() {
      //
      let arr = [];
      const { supplier, value } = this;
      if (isEmptyObject(supplier) || this.isEmptyObject || !value) {
        if (isEmptyObject(supplier)) {
          const payload = {
            props: "supplierError",
            value: "This field is required",
          };
          this.$store.commit("setProps", payload);
        }

        if (this.isEmptyObject) {
          const payload = {
            props: "produkError",
            value: "This field is required",
          };
          this.$store.commit("setProps", payload);
        }

        if (!value || value === 0) {
          this.errorJumlahBeli = "This field is required";
        }
      } else {
        if (this.dataTable.length) {
          for (let index = 0; index < this.dataTable.length; index++) {
            const body = {
              ...this.dataTable[index],
              jumlahBeli: parseInt(this.dataTable[index].jumlahBeli),
              total: this.dataTable[index].total,
              supplier: this.dataTable[index].supplier,
            };
            const data = await this.$axios.post("/pembelian", body);
            arr.push(data.data);
          }
        } else {
          const body = {
            ...this.data,
            jumlahBeli: parseInt(this.value),
            supplier: this.supplier,
            total: this.total,
          };
          const data = await this.$axios.post("/pembelian", body);
          arr.push(data.data);
        }
        this.$router.push({
          path: "/transaksi/pembelian/struk",
          query: { arr },
        });
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
      }
    },
    add() {
      //
    },
    isNumber(e) {
      const charCode = e.which ? e.which : e.keyCode;

      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>
