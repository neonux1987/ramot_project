import { TYPES } from "../actions/printActions";

const initialState = {
  printMode: false,
  printers: {
    isFetching: true,
    data: []
  },
  templates: {
    monthExpanses: {
      margin: 0,
      size: "a4",
      scale: 100,
      orientation: "portrait"
    },
    budgetExecution: {
      margin: 0,
      size: "a4",
      scale: 100,
      orientation: "landscape"
    },
    summarizedBudgets: {
      margin: 0,
      size: "a4",
      scale: 100,
      orientation: "landscape"
    }
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
