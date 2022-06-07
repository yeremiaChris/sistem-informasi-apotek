export const state = () => ({
  deleteModal: false,
  deleteId: null,
  isRequesting: false,
  dataTable: [],
  supplier: "",
  produk: "",
});

export const mutations = {
  setProps(state, payload) {
    state[payload.props] = payload.value;
  },
  deleteModalFalse(state) {
    state.deleteModal = false;
  },
  deleteModalTrue(state) {
    state.deleteModal = true;
  },
  getDeleteId(state, payload) {
    state.deleteId = payload;
  },
  deleteData(state, payload) {
    state.dataTable = state.dataTable.filter((el) => el._id !== payload);
  },
  deleteData(state, payload) {
    console.log(payload, state.dataTable);
    state.dataTable = state.dataTable.filter(
      (el) => el._id !== payload._id || el.supplier._id !== payload.supplierId
    );
  },
};
