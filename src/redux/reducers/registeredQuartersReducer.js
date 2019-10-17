
const initState = {
  registeredQuarters: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_REGISTERED_QUARTERS":
      return {
        ...state,
        registeredQuarters: {
          ...state.registeredQuarters,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_REGISTERED_QUARTERS":
      return {
        ...state,
        registeredQuarters: {
          ...state.registeredQuarters,
          isFetching: true
        }
      }
    case "REGISTERED_QUARTERS_FETCHING_FAILED":
      return {
        ...state,
        registeredQuarters: {
          ...state.registeredQuarters,
          status: "error",
          error: action.payload
        }
      }
    case "CLEANUP_QUARTERS":
      return {
        ...state,
        registeredQuarters: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}