import { TYPES } from "../actions/defaultExpansesCodesActions";

const initState = {
  isFetching: false,
  status: "",
  error: "",
  data: []
};

const defaultExpansesCodesReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.DEFAULT_EXPANSES_CODES_RECEIVE:
      return setState(state, {
        isFetching: false,
        status: "success",
        data: action.data
      });
    case TYPES.DEFAULT_EXPANSES_CODES_REQUEST:
      return setState(state, {
        isFetching: true
      });
    case TYPES.DEFAULT_EXPANSES_CODES_FETCHING_FAILED:
      return setState(state, {
        status: "error",
        error: action.payload
      });
    case TYPES.DEFAULT_EXPANSES_CODES_CLEANUP:
      return setState(state, {
        isFetching: false,
        status: "",
        error: "",
        data: []
      });

    default:
      return state;
  }
};

function setState(state, target) {
  return {
    ...state,
    ...target
  };
}

export default defaultExpansesCodesReducer;
