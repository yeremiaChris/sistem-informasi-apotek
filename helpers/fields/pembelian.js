const fields = [
  {
    title: "Tanggal Bayar",
    id: "payDate",
    type: "date",
  },
  {
    title: "Jumlah Bayar",
    id: "amount",
    type: "number",
  },
];
const fieldState = {};
for (let index = 0; index < fields.length; index++) {
  fieldState[fields[index].id] = "";
}

export { fields, fieldState };
