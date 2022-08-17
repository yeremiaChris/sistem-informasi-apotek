<template>
  <div>
    <ModalDelete v-show="open" @delete="deleteData" />
    <ObatHeader
      :items="itemsSelect"
      label="Laporan pembelian"
      @export="exportPdf"
      @getData="getData('/pembelian', 'data')"
    />
    <div class="my-4 border flex flex-col gap-3 px-4 py-2 box">
      <p>
        Tanggal awal
        <span class="font-bold">
          {{
            $route.query.startDate
              ? $dayjs($route.query.startDate).format("DD MMMM YYYY")
              : $dayjs().subtract(1, "year").format("DD MMMM YYYY")
          }}
        </span>
      </p>
      <p>
        Tanggal akhir
        <span class="font-bold">
          {{
            $route.query.endDate
              ? $dayjs($route.query.endDate).format("DD MMMM YYYY")
              : $dayjs().format("DD MMMM YYYY")
          }}
        </span>
      </p>
      <p>
        Total pembelian

        <span class="font-bold"> Rp {{ total.toLocaleString() }} </span>
      </p>
      <p>
        <span>
          Total
          <span v-if="!$route.query.query"
            >semua produk yang telah di beli</span
          >
          <span v-else>produk {{ $route.query.query }} yang telah di beli</span>
        </span>

        <span class="font-bold">
          {{ totalJumlahBeli.toLocaleString() }}
        </span>
      </p>
    </div>
    <ObatTable :headers="headers" :data="data" />
    <Pagination :data="pagination" />
    <client-only>
      <vue-html2pdf
        :paginate-elements-by-height="1400"
        :pdf-quality="2"
        pdf-content-width="100%"
        pdf-orientation="landscape"
        filename="exportFilename"
        ref="html2Pdf"
      >
        <div slot="pdf-content">
          <StrukKop
            class="pdf-item px-10 mt-6"
            :is-button="false"
            title="LAPORAN PEMBELIAN OBAT"
          />
          <div class="my-4 border flex flex-col gap-3 px-4 py-2 box mx-6">
            <p>
              Tanggal awal
              <span class="font-bold">
                {{
                  $route.query.startDate
                    ? $dayjs($route.query.startDate).format("DD MMMM YYYY")
                    : $dayjs().subtract(1, "year").format("DD MMMM YYYY")
                }}
              </span>
            </p>
            <p>
              Tanggal akhir
              <span class="font-bold">
                {{
                  $route.query.endDate
                    ? $dayjs($route.query.endDate).format("DD MMMM YYYY")
                    : $dayjs().format("DD MMMM YYYY")
                }}
              </span>
            </p>
            <p>
              Total pembelian

              <span class="font-bold"> Rp {{ total.toLocaleString() }} </span>
            </p>
            <p>
              <span>
                Total
                <span v-if="!$route.query.query"
                  >semua produk yang telah di beli</span
                >
                <span v-else
                  >produk {{ $route.query.query }} yang telah di beli</span
                >
              </span>

              <span class="font-bold">
                {{ totalJumlahBeli.toLocaleString() }}
              </span>
            </p>
          </div>
          <PrintReport
            :headers="headers"
            :data="data"
            title="LAPORAN PEMBELIAN OBAT"
          />
        </div>
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "Pembelian",

  data() {
    return {
      pagination: {
        page: 1,
        totalPage: 2,
      },
      headers: [
        "Nama",
        "Jenis",
        "Satuan",
        "Harga beli",
        "Harga jual",
        "Jumlah beli",
        "Total harga",
        "Supplier",
        "Tanggal transaksi",
      ],
      data: [],
      printData: [],
      itemsSelect: [
        {
          title: "Nama obat",
          value: "name",
        },
        {
          title: "Harga beli",
          value: "purchasePrice",
        },
        {
          title: "Harga jual",
          value: "sellingPrice",
        },
      ],
      total: 0,
      totalJumlahBeli: 0,
    };
  },

  async fetch() {
    await this.getData("/pembelian", "data");
  },

  computed: {
    open() {
      return this.$store.state.deleteModal;
    },
    deleteId() {
      return this.$store.state.deleteId;
    },
  },
  watch: {
    "$route.query.page"() {
      this.$fetch();
    },
    "$route.query.query"() {
      this.$fetch();
    },
    "$route.query.sortBy"() {
      this.$fetch();
    },
  },
  methods: {
    async getDataPrint() {
      const res2 = await this.$axios.get("/pembelian/print");
      this.printData = res2.data.map((item) => {
        const { title, uangBayar, total, kembalian, updatedAt } = item;
        return {
          title,
          uangBayar,
          total,
          kembalian,
          updatedAt,
        };
      });
    },
    async exportPdf() {
      //
      await this.getDataPrint();
      this.$refs.html2Pdf.generatePdf();
    },
    async deleteData() {
      try {
        await this.$axios.delete("/pembelian/" + parseInt(this.deleteId));
        this.$store.commit("deleteModalFalse");
        this.$nuxt.refresh();
      } catch (error) {
        this.$nuxt.error({
          statusCode: error.response.status,
          message: "Delete data was fail.",
        });
      }
    },

    async getData(endpoint, props) {
      const { page, query, sortBy, startDate, endDate } = this.$route.query;
      const res = await this.$axios.get(endpoint, {
        params: {
          page,
          query,
          sortBy,
          startDate,
          endDate,
        },
      });
      const { totalPembelian, data, pagination, totalJumlahBeli } = res.data;
      this.total = totalPembelian;
      this.totalJumlahBeli = totalJumlahBeli;
      this[props] = data.map((item) => ({
        name: item.name,
        type: item.type,
        unit: item.unit,
        purchasePrice: item.purchasePrice,
        sellingPrice: item.sellingPrice,
        jumlahBeli: item.jumlahBeli,
        total: item.total,
        supplier: item.supplier,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        id: item._id,
      }));
      this.pagination = pagination;
    },
  },
};
</script>
<style scoped>
.box p {
  @apply grid grid-cols-2;
}
</style>
