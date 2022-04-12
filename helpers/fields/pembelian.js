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
for (let index = 0; index < fields.length; index++) {
  fieldState[fields[index].id] = "";
}

export { fields, fieldState };
