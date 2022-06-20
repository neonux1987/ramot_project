import { TYPES } from "../actions/printTemplatesActions";

const initialState = {
  monthExpanses: {
    pageSize: "A4",
    copies: 1,
    landscape: false,
    colors: true,
    pageRanges: undefined,
    scaleFactor: 100
  },
  budgetExecutions: {
    pageSize: "A4",
    copies: 1,
    landscape: true,
    colors: true,
    pageRanges: undefined,
    scaleFactor: 100
  },
  summarizedBudgets: {
    pageSize: "A4",
    copies: 1,
    landscape: true,
    colors: true,
    pageRanges: undefined,
    scaleFactor: 100
  },
  statistics: {
    pageSize: "A4",
    copies: 1,
    landscape: true,
    scaleFactor: 100
  },
  expansesCodes: {
    pageSize: "A4",
    copies: 1,
    landscape: true,
    colors: true,
    pageRanges: undefined,
    scaleFactor: 100
  },
  summarizedSections: {
    pageSize: "A4",
    copies: 1,
    landscape: true,
    colors: true,
    pageRanges: undefined,
    scaleFactor: 100
  }
};

const printReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.UPDATE_TEMPLATE: {
      console.log("state", state);
      const newState = {
        ...state,
        [action.pageName]: {
          ...state[action.pageName],
          [action.key]: action.value
        }
      };
      console.log("newState", newState);
      return newState;
    }
    default:
      return state;
  }
};

export default printReducer;
