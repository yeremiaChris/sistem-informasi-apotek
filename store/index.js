export const state = () => ({
  deleteModal: false,
  deleteId: null,
});

export const mutations = {
  deleteModalFalse(state) {
    state.deleteModal = false;
  },
  deleteModalTrue(state) {
    state.deleteModal = true;
  },
  getDeleteId(state, payload) {
    state.deleteId = payload;
  },
};
