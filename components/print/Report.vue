<template>
  <section>
    <StrukKop class="pdf-item px-10 mt-6" :is-button="false" :title="title" />
    <PrintReportTable :data="data" :headers="headers" />
    <StrukFooter />
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  name: "Report",
};
</script>
