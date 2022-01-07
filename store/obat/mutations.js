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
        property === "supply" || property === "price" ? 0 : "";
      state.errorMedicine[property] = "";
    }
  },

  getDetail(state, payload) {
    state.formsMedicine = payload;
  },
};
