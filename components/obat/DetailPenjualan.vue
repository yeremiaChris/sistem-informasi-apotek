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
        :disabled="isEmptyObject"
        type="number"
        min="0"
        name="product"
        id="product"
        class="shadow-sm mt-1 border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
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
        placeholder="Quantity..."
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
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      temp: 1,
      uangBayar: 0,
      kembalian: 0,
      isEmptyObject: false,
      value: 0,
      total: 0,
      error: {},
    };
  },

  methods: {
    submit() {
      //
    },
    add() {
      //
    },
    buy() {
      //
    },
  },
};
</script>
