import { TYPES } from "../actions/summarizedSectionsActions";

const initState = {
  isFetching: false,
  status: "",
  error: "",
  data: []
};

const SummarizedSectionsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.SUMMARIZED_SECTIONS_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      };
    case TYPES.SUMMARIZED_SECTIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case TYPES.SUMMARIZED_SECTIONS_UPDATE: {
      const { payload, index } = action;

      const dataCopy = [...state.data];

      dataCopy[index] = payload;

      return {
        ...state,
        data: dataCopy
      };
    }
    case TYPES.SUMMARIZED_SECTIONS_ADD: {
      const { payload } = action;

      const dataCopy = [...state.data];

      dataCopy.push(payload);

      dataCopy.sort(sortBySection);

      return {
        ...state,
        data: dataCopy
      };
    }
    case TYPES.SUMMARIZED_SECTIONS_DELETE: {
      const dataCopy = [...state.data];

      dataCopy.splice(action.index, 1);

      return {
        ...state,
        data: dataCopy
      };
    }
    case TYPES.SUMMARIZED_SECTIONS_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.payload
      };
    case TYPES.SUMMARIZED_SECTIONS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        status: "",
        error: "",
        data: []
      };
    default:
      return state;
  }
};

function sortBySection(a, b) {
  if (a.section < b.section) {
    return -1;
  }
  if (a.section > b.section) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

export default SummarizedSectionsReducer;
