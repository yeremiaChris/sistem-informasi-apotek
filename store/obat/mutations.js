export default {
  changeData(state, payload) {
    state.errorMedicine[payload.key] = "";
    state.formsMedicine[payload.key] = payload.value;
  },

  getErrorFromBackend(state, payload) {
    state.errorMedicine[payload.key] = payload.value.message;
  },

  emptyField(state) {
    for (const property in state.formsMedicine) {
      state.formsMedicine[property] =
        property === "supply" ||
        property === "purchasePrice" ||
        property === "sellingPrice"
          ? 0
          : "";
      state.errorMedicine[property] = "";
    }
  },

  getDetail(state, payload) {
    console.log(payload);
    const { name, type, unit, purchasePrice, sellingPrice } = payload;
    state.formsMedicine = { name, type, unit, purchasePrice, sellingPrice };
  },
};
