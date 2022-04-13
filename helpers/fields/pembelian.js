const fields = [
  {
    title: "Tanggal bayar",
    id: "payDate",
    type: "date",
  },
  {
    title: "Jumlah pembelian",
    id: "amount",
    type: "number",
  },
  {
    title: "Jumlah bayar",
    id: "amount",
    type: "number",
  },
];
const fieldState = {};
const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const newDate = year + " " + month + " " + day;

for (let index = 0; index < fields.length; index++) {
  fieldState[fields[index].id] = fields[index].id === "payDate" ? newDate : "";
}

export { fields, fieldState };
