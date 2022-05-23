<template>
  <div class="text-gray-600">
    <h1 class="text-3xl font-bold mb-6">Transaksi Pembelian</h1>
    <FormsDropdown
      :data="suppliers"
      :value="supplier"
      v-model="supplier"
      title="Supplier"
      @search="search('supplier', 'suppliers', $event)"
    />
    <FormsDropdown
      :data="products"
      :value="product"
      v-model="product"
      title="Produk"
      @search="search('product', 'products', $event)"
      @getDetail="getData($event, 'detail')"
    />
    <ObatDetail class="mt-4" :data="detail" />
    <ObatTable class="mt-10" :headers="headers" :data="dataTable" />
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
        "Nama supplier",
        "Nama obat",
        "Stok awal",
        "Harga per satuan",
        "Jumlah beli",
        "Total harga",
      ],
      detail: {},
    };
  },

  mounted() {
    this.getData("/medicine/select-data", "products");
    this.getData("/supplier/select-data", "suppliers");
  },

  computed: {
    dataTable() {
      return this.$store.state.dataTable.map(item, (i) => {
        return {
          _id: item._id,
          name: item.name,
          price: item.price,
          supply: item.supply,
          type: item.type,
          unit: item.unit,
          updatedAt: item.updatedAt,
        };
      });
    },
  },

  methods: {
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
