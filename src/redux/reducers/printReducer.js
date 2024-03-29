import { TYPES } from "../actions/printActions";

const initialState = {
  printMode: false,
  colors: true,
  printers: {
    isFetching: true,
    data: []
  },
  printableComponentRef: null,
  output: null,
  printReady: false
};

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
    case TYPES.SET_PRINT_READY: {
      return {
        ...state,
        printReady: action.printReady
      };
    }
    case TYPES.SET_OUTPUT: {
      return {
        ...state,
        output: action.output
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
    case TYPES.SET_PRINTABLE_COMPONENT_REF: {
      return {
        ...state,
        printableComponentRef: action.printableComponentRef
      };
    }
    default:
      return state;
  }
};

export default printReducer;
