const initialState = {
  enabled: false
}

const printReducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_PRINT_MODE`: {
      return {
        ...state,
        enabled: action.enabled
      };
    }
    default: return state;
  }

}

export default printReducer;
