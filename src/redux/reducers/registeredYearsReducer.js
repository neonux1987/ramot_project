
const initState = {
  isFetching: false,
  status: "",
  error: "",
  data: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_REGISTERED_YEARS":
      return {
        ...state,
        isFetching: false,
        status: "success",
        data: action.data
      }
    case "REQUEST_REGISTERED_YEARS":
      return {
        ...state,
        isFetching: true
      }
    case "REGISTERED_YEARS_FETCHING_FAILED":
      return {
        ...state,
        status: "error",
        error: action.payload
      }
    case "CLEANUP_YEARS":
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