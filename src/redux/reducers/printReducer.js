const initialState = {
  printMode: false,
  page: {
    margin: 0,
    size: "a4",
    scale: 100,
    orientation: "landscape"
  }
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
