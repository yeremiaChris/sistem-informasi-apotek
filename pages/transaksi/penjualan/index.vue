<template>
  <form class="text-gray-600">
    <Breadcrumbs url="Transaksi / Penjualan" class="mb-7" />
    <h1 class="text-3xl font-bold mb-6">Transaksi Penjualan</h1>
    <!-- <FormsToggle :value="isRecipe" @toggle="toggle" /> -->
    <!-- form dengan resep -->
    <div v-if="detail.type === 'keras'">
      <h2 class="mb-2 font-bold">Obat dengan resep dokter</h2>
      <div v-for="(item, key, i) in recipiDatas" :key="i">
        <FormsTextarea
          :title="key.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')"
          :error="recipiDataError[key]"
          :value="recipiData[key]"
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
      :recipiDataError="recipiDataError"
      :recipiData="recipiData"
      @setProps="setProps"
      @setErrorRecipi="setErrorRecipi"
      @print="print"
    />
    <ObatTable
      class="mt-10"
      :headers="headersPrint"
      :data="dataTable"
      deleteKey="deleteDataPenjualan"
    />

    <client-only>
      <vue-html2pdf
        :paginate-elements-by-height="1400"
        :pdf-quality="2"
        pdf-content-width="100%"
        pdf-orientation="landscape"
        filename="exportFilename"
        ref="strukPenjualan"
      >
        <PrintPenjualan slot="pdf-content" :headers="headersPrint" />
      </vue-html2pdf>
    </client-only>
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
        IdentitasCustomer: "",
        InformasiObat: "",
        Deskripsi: "",
      },
      recipiDatas: {
        IdentitasDokter: "",
        IdentitasCustomer: "",
        InformasiObat: "",
        Deskripsi: "",
      },
      recipiDataError: {
        IdentitasDokter: "",
        IdentitasCustomer: "",
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
      headersPrint: [
        "Nama obat",
        "Tipe",
        "Satuan",
        "Resep dokter",
        "Harga jual",
        "Jumlah beli",
        "Total harga",
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
    "$data.recipiData.IdentitasCustomer"() {
      this.recipiDataError.IdentitasCustomer = "";
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
      return this.$store.state.dataTable.map((item) => {
        const { _id, name, type, unit, sellingPrice, jumlahBeli, total } = item;
        return {
          _id,
          name,
          type,
          unit,
          isRecipe: item.type === "keras",
          sellingPrice,
          jumlahBeli,
          total,
        };
      });
    },
  },

  methods: {
    print() {
      this.$refs.strukPenjualan.generatePdf();
    },
    async getData(endpoint, props) {
      const res = await this.$axios.get(endpoint);
      console.log(res);
      this[props] = res.data;
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
