
const initState = {
  registeredYears: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_REGISTERED_YEARS":
      return {
        ...state,
        registeredYears: {
          ...state.registeredYears,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_REGISTERED_YEARS":
      return {
        ...state,
        registeredYears: {
          ...state.registeredYears,
          isFetching: true
        }
      }
    case "FETCHING_FAILED":
      return {
        ...state,
        registeredYears: {
          ...state.registeredYears,
          status: "error",
          error: action.payload
        }
      }
    case "CLEANUP_YEARS":
      return {
        ...state,
        registeredYears: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}