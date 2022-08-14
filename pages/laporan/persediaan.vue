<template>
  <div>
    <Breadcrumbs url="Laporan / Persediaan" class="mb-7" />

    <ModalDelete v-show="open" @delete="deleteData" />
    <ObatHeader
      :items="itemsSelect"
      label="Laporan Persediaan Obat"
      @export="exportPdf"
      @getData="$fetch()"
    />
    <div class="my-4">
      <p>
        Tanggal awal
        <span class="font-bold">
          {{
            $dayjs($route.query.startDate).format("DD MMMM YYYY") ||
            $dayjs().subtract(1, "year").format("DD MMMM YYYY")
          }}
        </span>
      </p>
      <p>
        Tanggal akhir
        <span class="font-bold">
          {{
            $dayjs($route.query.endDate).format("DD MMMM YYYY") ||
            $dayjs().format("DD MMM YYYY")
          }}
        </span>
      </p>
      <p>
        Total seluruh persediaan obat

        <span class="font-bold"> Rp {{ total.toLocaleString() }} </span>
      </p>
    </div>
    <ObatTable :headers="headers" :data="data" />
    <Pagination :data="pagination" />

    <client-only>
      <vue-html2pdf
        :paginate-elements-by-height="1400"
        :pdf-quality="2"
        pdf-content-width="800px"
        pdf-orientation="portrait"
        filename="exportFilename"
        ref="html2Pdf"
      >
        <div slot="pdf-content">
          <StrukKop
            class="pdf-item px-10 mt-6"
            :is-button="false"
            title="LAPORAN PERSEDIAAN OBAT"
          />
          <div class="my-4 mx-6">
            <p>
              Tanggal awal
              <span class="font-bold">
                {{
                  $dayjs($route.query.startDate).format("DD MMMM YYYY") ||
                  $dayjs().subtract(1, "year").format("DD MMMM YYYY")
                }}
              </span>
            </p>
            <p>
              Tanggal akhir
              <span class="font-bold">
                {{
                  $dayjs($route.query.endDate).format("DD MMMM YYYY") ||
                  $dayjs().format("DD MMM YYYY")
                }}
              </span>
            </p>
            <p>
              Total seluruh persediaan obat

              <span class="font-bold"> Rp {{ total.toLocaleString() }} </span>
            </p>
          </div>
          <PrintReport
            :headers="headers"
            :data="printData"
            title="LAPORAN PERSEDIAAN OBAT"
          />
        </div>
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      printData: [],
      pagination: {
        page: 1,
        totalPage: 1,
      },
      headers: [
        "Nama",
        "Harga beli",
        "Harga jual",
        " Persediaan",
        "Tipe",
        "Satuan",
        "Tanggal update",
      ],
      data: [],
      itemsSelect: [
        {
          title: "Nama",
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
        {
          title: "Persediaan",
          value: "supply",
        },
      ],
    };
  },

  async fetch() {
    const { page, query, sortBy, startDate, endDate } = this.$route.query;
    const res = await this.$axios.get("/medicine", {
      params: {
        page,
        query,
        sortBy,
        startDate,
        endDate,
      },
    });

    const { data, pagination } = res.data;
    const datas = data.map((item) => {
      return {
        _id: item._id,
        id: item._id,
        name: item.name,
        purchasePrice: item.purchasePrice,
        sellingPrice: item.sellingPrice,
        supply: item.supply,
        type: item.type,
        unit: item.unit,
        updatedAt: item.updatedAt,
      };
    });
    this.data = datas;
    this.pagination = pagination;
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

  computed: {
    open() {
      return this.$store.state.deleteModal;
    },
    deleteId() {
      return this.$store.state.deleteId;
    },
    total() {
      const total = this.data.reduce((a, c) => a + c.supply, 0);
      return total || 0;
    },
  },

  methods: {
    async getData() {
      const res2 = await this.$axios.get("/medicine/print");
      this.printData = res2.data.map((item) => {
        return {
          _id: item._id,
          id: item._id,
          name: item.name,
          purchasePrice: item.purchasePrice,
          sellingPrice: item.sellingPrice,
          supply: item.supply,
          type: item.type,
          unit: item.unit,
          updatedAt: item.updatedAt,
        };
      });
    },

    async deleteData() {
      try {
        await this.$axios.delete("/medicine/" + this.deleteId);
        this.$store.commit("deleteModalFalse");
        this.$nuxt.refresh();
      } catch (error) {
        this.$nuxt.error({
          statusCode: error.response.status,
          message: "Delete data was fail.",
        });
      }
    },
    async exportPdf() {
      //
      await this.getData();
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>
