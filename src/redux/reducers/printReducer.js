const initialState = {
  printMode: false
}

const printReducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_PRINT_MODE`: {
      return {
        ...state,
        printMode: action.printMode
      };
    }
    default: return state;
  }

}

export default printReducer;
