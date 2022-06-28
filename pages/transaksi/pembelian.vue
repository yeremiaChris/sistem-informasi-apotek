<template>
  <div class="text-gray-600">
    <Breadcrumbs url="Transaksi / Pembelian" class="mb-7" />

    <h1 class="text-3xl font-bold mb-6">Transaksi Pembelian</h1>
    <FormsDropdown
      :data="suppliers"
      :value="supplier"
      v-model="supplier"
      :error="supplierError"
      title="Supplier"
      @search="search('supplier', 'suppliers', $event)"
      @setProps="setProps($event, 'supplierData')"
    />

    <FormsDropdown
      :data="products"
      :value="product"
      :error="produkError"
      v-model="product"
      title="Produk"
      @search="search('product', 'products', $event)"
      @getDetail="getData($event, 'detail')"
    />

    <ObatDetail
      class="mt-5"
      :data="detail"
      :supplier="supplierData"
      @setProps="setProps2($event)"
      @print="print"
    />

    <ObatTable
      class="mt-10"
      :headers="headers2"
      :data="dataTable"
      @setValueSupplier="setProps('supplier', $event)"
      @setValueProduct="setProps('product', $event)"
    />

    <client-only>
      <vue-html2pdf
        :paginate-elements-by-height="1400"
        :pdf-quality="2"
        pdf-content-width="100%"
        pdf-orientation="landscape"
        filename="exportFilename"
        ref="strukPembelian"
      >
        <PrintPembelian slot="pdf-content" :headers="headers" />
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "TransaksiComponent",

  data() {
    return {
      products: [],
      supplier: "",
      suppliers: [],
      product: "",
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
      headers2: [
        "Nama supplier",
        "Nama obat",
        "Stok",
        "Harga per satuan",
        "Jumlah beli",
        "Total harga",
      ],
      detail: {},
      supplierData: {},
      item: null,
      isDroped: false,
      dataTest: [
        {
          id: "1",
          title: "button 1",
          submenu: [],
        },
        {
          id: "2",
          title: "button 2",
          submenu: [],
        },
      ],
    };
  },

  async fetch() {
    await this.getData("/medicine/select-data", "products");
    await this.getData("/supplier/select-data", "suppliers");
    this.$store.commit("setProps", { props: "supplierError", value: "" });
    this.$store.commit("setProps", { props: "produkError", value: "" });
  },

  watch: {
    supplier() {
      this.$store.commit("setProps", { props: "supplierError", value: "" });
    },
  },

  computed: {
    report() {
      return this.$store.state.report;
    },

    dataTable() {
      return this.$store.state.dataTable.map((item) => {
        return {
          _id: item._id,
          nameSupplier: item.supplier.title,
          supplierId: item.supplier._id,
          nameMedicine: item.name,
          supply: item.supply,
          price: item.price,
          jumlahBeli: item.jumlahBeli,
          total: item.total,
        };
      });
    },

    supplierError() {
      return this.$store.state.supplierError;
    },

    produkError() {
      return this.$store.state.produkError;
    },
  },

  methods: {
    print() {
      this.$refs.strukPembelian.generatePdf();
    },

    setProps(data, props) {
      this[props] = data;
    },

    setProps2(props) {
      this[props.props] = props.data;
    },

    async getData(endpoint, props) {
      const res = await this.$axios.get(endpoint);

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
  },
};
</script>
