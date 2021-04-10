import { TYPES } from "../actions/printActions";

const initialState = {
  printMode: false,
  printers: {
    isFetching: true,
    data: []
  },
  templates: {
    monthExpanses: {
      printer: "",
      size: "A4",
      pages: "all",
      landscape: false,
      colors: true,
      range: {
        from: 0,
        to: 0
      }
    },
    budgetExecution: {
      printer: "",
      size: "A4",
      pages: "all",
      landscape: false,
      colors: true,
      range: {
        from: 0,
        to: 0
      }
    },
    summarizedBudgets: {
      printer: "",
      size: "A4",
      pages: "all",
      landscape: false,
      colors: true,
      range: {
        from: 0,
        to: 0
      }
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
