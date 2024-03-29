export const TYPES = {
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL"
};

export const show = (ModalComponent, props) => {
  return (dispatch) =>
    dispatch({
      type: TYPES.SHOW_MODAL,
      id: ModalComponent.name,
      ModalComponent,
      props
    });
};

export const hide = (ModalComponent) => {
  return (dispatch) =>
    dispatch({
      type: TYPES.HIDE_MODAL,
      id: ModalComponent.name
    });
};
