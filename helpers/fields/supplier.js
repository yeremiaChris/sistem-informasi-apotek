const fields = [
  {
    title: "Name",
    id: "name",
  },
  {
    title: "Image",
    id: "image",
  },
];

let fieldState = {};
for (let index = 0; index < fields.length; index++) {
  fieldState[fields[index].id] = "";
}
export { fields, fieldState };
