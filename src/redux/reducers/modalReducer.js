const initialState = {
  ModalComponent: null,
  props: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ModalComponent: action.ModalComponent,
        props: action.props
      }
    case 'HIDE_MODAL':
      return initialState
    default:
      return state
  }
}