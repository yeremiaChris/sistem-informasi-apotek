<template>
  <form
    ref="formPenjualan"
    class="mt-3 flex justify-between border border-gray-300 px-4 py-4 shadow-lg"
    @submit.prevent="buy"
  >
    <div class="grid place-items-start">
      <p>Nama obat</p>
      <p class="font-bold">{{ data.name || "-" }}</p>
      <p>Satuan</p>
      <p class="font-bold">{{ data.unit || "-" }}</p>
      <p>Harga</p>
      <p class="font-bold">
        {{ data.sellingPrice ? data.sellingPrice.toLocaleString() : "-" }}
      </p>
      <p>Stok</p>
      <p class="font-bold">
        {{ data.supply ? data.supply.toLocaleString() : 0 }}
      </p>
      <p class="text-xl mt-5 font-bold">
        Uang bayar Rp {{ uangBayar.toLocaleString() }}
      </p>
      <p class="text-xl mt-5 font-bold">
        Kembalian Rp {{ kembalian.toLocaleString() }}
      </p>
      <p class="text-right mt-3 font-bold text-xl">
        Total Rp. {{ total.toLocaleString() }}
      </p>
    </div>

    <div>
      <p class="my-1">Jumlah jual</p>
      <input
        v-model="jumlahBeli"
        :disabled="isEmptyObject"
        type="number"
        min="0"
        name="product"
        id="product"
        class="shadow-sm mt-1 border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
        placeholder="Quantity..."
        @keypress="onlyNumber"
      />
      <p class="text-red-500">{{ jumlahBeliError }}</p>
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
  },
  data() {
    return {
      uangBayar: 0,
      jumlahBeli: 1,
      jumlahBeliError: "",
      error: { uangBayar: "" },
    };
  },

  mounted() {
    const payload = {
      value: [],
      props: "dataTable",
    };
    this.$store.commit("setProps", payload);
  },

  watch: {
    uangBayar() {
      if (this.uangBayar >= this.total) {
        this.error.uangBayar = "";
      }
    },
    jumlahBeli() {
      this.jumlahBeliError = "";
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
            parseInt(this.data.sellingPrice) * this.jumlahBeli;
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
      if (this.isEmptyObject) {
        if (this.isEmptyObject) {
          this.$store.commit("setProps", {
            props: "produkError",
            value: "Field product harus diisi.",
          });
        }
      } else if (this.jumlahBeli > this.data.supply || this.data.supply === 0) {
        console.log("gk bisa beli");
        this.jumlahBeliError = "Persediaan yang tersedia tidak cukup.";
      } else {
        const isRecipiValue = Object.values(this.recipiData).every(
          (el) => el.length
        );
        if (this.data.type === "keras" && !isRecipiValue) {
          for (const key in this.recipiData) {
            if (Object.hasOwnProperty.call(this.recipiData, key)) {
              if (this.data.type === "keras" && !this.recipiData[key].length) {
                const payload = {
                  props: key,
                  data: "Field product tidak boleh kosong. ",
                };
                this.$emit("setErrorRecipi", payload);
              }
            }
          }
        } else {
          const obj = {
            ...this.data,
            recepiData: this.recipiData,
            total: this.jumlahBeli * this.data.sellingPrice,
            jumlahBeli: this.jumlahBeli,
          };

          const isFilled = this.dataTable.some((el) => el._id === obj._id);

          let value = [];
          if (!isFilled) {
            value = [obj, ...this.dataTable];
          } else {
            value = this.dataTable.map((item) => ({
              ...item,
              total: obj.total,
              jumlahBeli:
                item._id === obj._id
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
          const detailPayload = {
            data: {},
            props: "detail",
          };
          this.$emit("setProps", detailPayload);

          const payloadProduct = {
            props: "product",
            data: "",
          };
          this.$emit("setProps", payloadProduct);
          this.jumlahBeli = 1;
        }
      }
    },

    async buy() {
      let arr = [];
      const payload = {
        value: this.dataTable,
        props: "dataTable",
      };
      const isRecipiValue = Object.values(this.recipiData).every(
        (el) => el.length
      );
      if (
        (this.isEmptyObject && !this.dataTable.length) ||
        this.uangBayar < this.total ||
        parseInt(this.data.jumlahBeli) > parseInt(this.data.supply)
      ) {
        if (this.data.jumlahBeli > this.data.supply) {
          this.$store.commit("setProps", {
            props: "produkError",
            value: `The ${this.data.name} stock is empty`,
          });
        }

        if (this.isEmptyObject && !this.dataTable.length) {
          const payload = {
            props: "produkError",
            value: "Field ini harus diisi.",
          };
          this.$store.commit("setProps", payload);
        }

        if (this.uangBayar < this.total) {
          this.error.uangBayar =
            "Uang bayar harus lebih besar atau sama dengan total.";
        }

        if (!this.dataTable.length && this.isEmptyObject) {
          const payload = {
            props: "produkError",
            value: "Field product tidak boleh kosong. ",
          };
          this.$store.commit("setProps", payload);
        }

        for (const key in this.recipiData) {
          if (Object.hasOwnProperty.call(this.recipiData, key)) {
            if (
              this.data &&
              this.data.type === "keras" &&
              !this.recipiData[key].length
            ) {
              const payload = {
                props: key,
                data: "Field product tidak boleh kosong. ",
              };
              this.$emit("setErrorRecipi", payload);
            }
          }
        }
      } else {
        if (!this.dataTable.length) {
          if (this.jumlahBeli > this.data.supply || this.data.supply === 0) {
            console.log("gk bisa beli");
            this.jumlahBeliError = "Persediaan yang tersedia tidak cukup.";
          } else if (this.data.type === "keras" && !isRecipiValue) {
            for (const key in this.recipiData) {
              if (Object.hasOwnProperty.call(this.recipiData, key)) {
                if (
                  this.data.type === "keras" &&
                  !this.recipiData[key].length
                ) {
                  const payload = {
                    props: key,
                    data: "Field product tidak boleh kosong. ",
                  };
                  this.$emit("setErrorRecipi", payload);
                }
              }
            }
          } else {
            let obj = {};
            obj = {
              ...this.data,
              recepiData: this.recipiData,
              jumlahBeli: this.jumlahBeli,
              total: this.data.sellingPrice * this.jumlahBeli,
            };

            // post data
            const data = await this.$axios.post("/penjualan", obj);
            this.$store.commit("setProps", payload);
            this.$emit("setProps", { props: "detail", data: {} });
            this.$emit("setProps", { props: "product", data: "" });
            this.$refs.formPenjualan.reset(); // This will clear that form
            const payload2 = {
              value: true,
              props: "success",
            };
            window.scrollTo({ top: 0, behavior: "smooth" });

            this.$store.commit("setProps", payload2);
            const payload3 = {
              value: [],
              props: "dataTable",
            };
            this.$store.commit("setProps", payload3);
            // const payloadPrint = {
            //   props: "report",
            //   value: data.data,
            // };
            // this.$store.commit("setProps", payloadPrint);
            // this.$emit("print");
            setTimeout(() => {
              const payload3 = {
                value: false,
                props: "success",
              };
              this.$store.commit("setProps", payload3);
            }, 3000);
            this.$refs.formPenjualan.reset(); // This will clear that form
            this.uangBayar = 0;
            arr.push(data.data);
            this.$router.push({
              path: "/transaksi/penjualan/struk",
              query: { arr },
            });
          }
        } else {
          console.log(this.dataTable);
          for (let index = 0; index < this.dataTable.length; index++) {
            const recepiData = this.dataTable[index].recepiData;
            const obj = {
              ...this.dataTable[index],
              recepiData,
              jumlahBeli: this.dataTable[index].jumlahBeli,
              total:
                this.dataTable[index].sellingPrice *
                this.dataTable[index].jumlahBeli,
            };
            const data = await this.$axios.post("/penjualan", obj);
            arr.push(data.data);
          }
          this.$store.commit("setProps", payload);
          this.$emit("setProps", { props: "detail", data: {} });
          this.$emit("setProps", { props: "product", data: "" });
          this.$refs.formPenjualan.reset(); // This will clear that form
          const payload2 = {
            value: true,
            props: "success",
          };
          window.scrollTo({ top: 0, behavior: "smooth" });

          this.$store.commit("setProps", payload2);
          const payload3 = {
            value: [],
            props: "dataTable",
          };
          this.$store.commit("setProps", payload3);
          // const payloadPrint = {
          //   props: "report",
          //   value: data.data,
          // };
          // this.$store.commit("setProps", payloadPrint);
          // this.$emit("print");
          setTimeout(() => {
            const payload3 = {
              value: false,
              props: "success",
            };
            this.$store.commit("setProps", payload3);
          }, 3000);
          this.$refs.formPenjualan.reset(); // This will clear that form
          this.uangBayar = 0;
          this.$router.push({
            path: "/transaksi/penjualan/struk",
            query: { arr },
          });
        }

        // last reset form
      }
    },
  },
};
</script>
