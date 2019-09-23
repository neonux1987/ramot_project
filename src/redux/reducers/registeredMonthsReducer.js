import Helper from '../../helpers/Helper';

const initState = {
  registeredMonths: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_REGISTERED_MONTHS":
      return {
        ...state,
        registeredMonths: {
          ...state.registeredMonths,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_REGISTERED_MONTHS":
      return {
        ...state,
        registeredMonths: {
          ...state.registeredMonths,
          isFetching: true
        }
      }
    case "FETCHING_FAILED":
      return {
        ...state,
        registeredMonths: {
          ...state.registeredMonths,
          status: "error",
          error: action.payload
        }
      }
    case "CLEANUP_MONTHS":
      return {
        ...state,
        registeredMonths: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}