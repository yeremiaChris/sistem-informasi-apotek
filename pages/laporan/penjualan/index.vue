<template>
  <div>
    <ModalDelete v-show="open" @delete="deleteData" />
    <ObatHeader
      :items="itemsSelect"
      label="Laporan penjualan"
      @export="exportPdf"
      @getData="getData('/penjualan', 'data')"
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
        Total penjualan

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
        ><div slot="pdf-content">
          <StrukKop
            class="pdf-item px-10 mt-6"
            :is-button="false"
            title="LAPORAN PENJUALAN OBAT"
          />
          <div class="my-4 mx-6 border flex flex-col gap-3 px-4 py-2 box">
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
              Total penjualan

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
          <!-- <PrintReport
            :headers="headers"
            :data="data"
            title="LAPORAN PENJUALAN OBAT"
          /> -->
        </div>
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "Penjualan",

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
        "Harga jual",
        "Jumlah jual",
        "Total harga",
        "Tanggal",
        "Resep dokter",
      ],
      printData: [],
      data: [],
      itemsSelect: [
        {
          title: "Newest",
          value: "newest",
        },
        {
          title: "Type",
          value: "type",
        },
      ],
      total: 0,
      totalJumlahBeli: 0,
    };
  },

  async fetch() {
    await this.getData("/penjualan", "data");
  },

  computed: {
    open() {
      return this.$store.state.deleteModal;
    },
    deleteId() {
      return this.$store.state.deleteId;
    },
    // total() {
    //   const total = this.data.reduce((a, c) => a + c.total, 0);
    //   return total || 0;
    // },
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
      const res2 = await this.$axios.get("/penjualan/print");
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
        await this.$axios.delete("/penjualan/" + parseInt(this.deleteId));
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
      const { data, pagination, totalPenjualan, totalJumlahBeli } = res.data;
      this.total = totalPenjualan;
      this.totalJumlahBeli = totalJumlahBeli;
      this[props] = data.map((item) => {
        const {
          _id,
          name,
          type,
          unit,
          sellingPrice,
          jumlahBeli,
          total,
          updatedAt,
          recepiData,
        } = item;
        return {
          _id,
          name,
          type,
          unit,
          sellingPrice,
          jumlahBeli,
          total,
          updatedAt,
          recepiData: type === "keras" ? recepiData : "-",
        };
      });
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
