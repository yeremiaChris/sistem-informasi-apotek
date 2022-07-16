import Vue from "vue";
import { Line } from "vue-chartjs";
import numeral from "numeral";

Vue.component("LineChart", {
  extends: Line,
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (value) => numeral(value).format("0,0"),
              },
            },
          ],
        },
      }),
    },
  },
  watch: {
    data() {
      this.renderChart(this.data, {
        ...this.options,
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (value) => numeral(value).format("0,0"),
              },
            },
          ],
        },
      });
    },
  },
  mounted() {
    this.renderChart(this.data, {
      ...this.options,
      scales: {
        yAxes: [
          {
            ticks: {
              callback: (value) => numeral(value).format("0,0"),
            },
          },
        ],
      },
    });
  },
});
