import { TYPES } from '../actions/registeredReportsActions';

const initState = {
  isFetching: false,
  status: "",
  error: "",
  data: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.REGISTERED_REPORTS_RECEIVE:
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      }
    case TYPES.REGISTERED_REPORTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case TYPES.REGISTERED_REPORTS_FETCHING_FAILED:
      return {
        ...state,
        status: "error",
        error: action.payload
      }
    case TYPES.REGISTERED_REPORTS_CLEANUP:
      return {
        ...state,
        isFetching: false,
        status: "",
        error: "",
        data: []
      }
    default: return state;
  }
}