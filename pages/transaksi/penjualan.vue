<template>
  <form class="text-gray-600">
    <Breadcrumbs url="Transaksi / Penjualan" class="mb-7" />
    <h1 class="text-3xl font-bold mb-6">Transaksi Penjualan</h1>
    <FormsToggle :value="isRecipe" @toggle="toggle" />

    <!-- form dengan resep -->
    <div v-if="isRecipe">
      <div v-for="(item, key, i) in recipiData" :key="i">
        <FormsTextarea
          :title="key.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')"
          :error="recipiDataError[key]"
          v-model="recipiData[key]"
        />
      </div>
    </div>

    <FormsDropdown
      :data="products"
      :value="product"
      :error="produkError"
      endpoint="/medicine/"
      v-model="product"
      title="Obat"
      @search="search('product', 'products', $event)"
      @getDetail="getData($event, 'detail')"
    />

    <ObatDetailPenjualan
      :data="detail"
      :isRecipe="isRecipe"
      :recipiDataError="recipiDataError"
      :recipiData="recipiData"
      @setProps="setProps"
      @setErrorRecipi="setErrorRecipi"
    />

    <ObatTable
      class="mt-10"
      :headers="headers"
      :data="dataTable"
      deleteKey="deleteDataPenjualan"
    />
  </form>
</template>

<script>
export default {
  name: "TransaksiPenjualanComponent",
  data() {
    return {
      products: [],
      product: "",
      isRecipe: false,
      recipiData: {
        IdentitasDokter: "",
        IdentitasPasien: "",
        InformasiObat: "",
        Deskripsi: "",
      },
      recipiDataError: {
        IdentitasDokter: "",
        IdentitasPasien: "",
        InformasiObat: "",
        Deskripsi: "",
      },
      detail: {},
      headers: [
        "Nama obat",
        "Harga per satuan",
        "Jumlah beli",
        "Total harga",
        "Resep dokter",
      ],
    };
  },

  async fetch() {
    await this.getData("/medicine/select-data", "products");
  },

  watch: {
    "$data.recipiData.IdentitasDokter"() {
      this.recipiDataError.IdentitasDokter = "";
    },
    "$data.recipiData.IdentitasPasien"() {
      this.recipiDataError.IdentitasPasien = "";
    },
    "$data.recipiData.InformasiObat"() {
      this.recipiDataError.InformasiObat = "";
    },
    "$data.recipiData.Deskripsi"() {
      this.recipiDataError.Deskripsi = "";
    },
  },

  computed: {
    produkError() {
      return this.$store.state.produkError;
    },

    dataTable() {
      return this.$store.state.dataTable;
    },
  },

  methods: {
    async getData(endpoint, props) {
      const res = await this.$axios.get(endpoint);

      this[props] = res.data;
      const payload = {
        props: "produkError",
        value: "",
      };
      this.$store.commit("setProps", payload);
    },

    search(props2, props, key) {
      const tempData = this[props];
      if (!key) {
        this.getData("/medicine/select-data", props);
      } else {
        this[props] = tempData.filter((el) =>
          el.title.toLowerCase().includes(key.toLowerCase())
        );
      }
      this[props2] = key;
    },

    toggle() {
      this.isRecipe = !this.isRecipe;
    },

    setProps(props) {
      this[props.props] = props.data;
    },

    setErrorRecipi(props) {
      this.recipiDataError[props.props] = props.data;
    },
  },
};
</script>
