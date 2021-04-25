import { TYPES } from "../actions/printActions";

const initialState = {
  printMode: false,
  colors: true,
  printers: {
    isFetching: true,
    data: []
  }
}

const printReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_PRINT_MODE: {
      return {
        ...state,
        printMode: action.printMode
      };
    }
    case TYPES.SET_COLORS: {
      return {
        ...state,
        colors: action.colors
      };
    }
    case TYPES.PRINT_REQUEST: {
      return {
        ...state,
        printers: {
          ...state.printers,
          isFetching: true
        }
      };
    }

    case TYPES.PRINT_RECEIVE: {
      return {
        ...state,
        printers: {
          ...state.printers,
          isFetching: false,
          data: action.data
        }
      };
    }
    default: return state;
  }

}

export default printReducer;
