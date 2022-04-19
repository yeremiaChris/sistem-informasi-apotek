const fields = [
  {
    title: "Tanggal bayar",
    id: "payDate",
    type: "date",
  },
  {
    title: "Jumlah pembelian",
    id: "purchaseAmount",
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
  fieldState[fields[index].id] =
    fields[index].id === "payDate" ? new Date() : "0";
}

export { fields, fieldState };
