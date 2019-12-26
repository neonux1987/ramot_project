export const TYPES = {
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL"
}

export const showModal = (modalType, modalProps) => {
  return dispatch => dispatch({
    type: TYPES.SHOW_MODAL,
    modalType,
    modalProps
  });
}

export const hideModal = () => {
  return dispatch => dispatch({
    type: TYPES.HIDE_MODAL
  });
}