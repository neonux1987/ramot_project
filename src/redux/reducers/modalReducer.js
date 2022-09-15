import { TYPES } from "../actions/modalActions";

const initialState = {
  modals: []
};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SHOW_MODAL: {
      const { ModalComponent, props, id } = action;

      const modalsCopy = [...state.modals];

      modalsCopy.push({
        id,
        ModalComponent,
        props
      });
      return {
        modals: modalsCopy
      };
    }
    case TYPES.HIDE_MODAL: {
      const { id } = action;
      const modalsCopy = [...state.modals];

      const filteredModals = modalsCopy.filter((modal) => modal.id !== id);

      return {
        modals: filteredModals
      };
    }
    default:
      return state;
  }
};

export default ModalReducer;
