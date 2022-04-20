const fields = [
  [
    {
      title: "Pilih produk",
      id: "product",
      value: "",
      type: "select",
    },
    {
      title: "Pilih supplier",
      id: "supplier",
      value: "",
      type: "select",
    },
    {
      title: "Jumlah pembelian",
      value: "0",
      id: "purchaseAmount",
      type: "number",
    },
  ],
];

const fieldState = {};

for (let index = 0; index < fields.length; index++) {
  fieldState[fields[index].id] = "0";
}

const fields2 = [
  {
    title: "Uang yang dikasih.",
    id: "amount",
    type: "number",
  },
];

const fieldState2 = {};

for (let index = 0; index < fields2.length; index++) {
  fieldState2[fields2[index].id] = "0";
}

export { fields, fieldState, fields2, fieldState2 };
