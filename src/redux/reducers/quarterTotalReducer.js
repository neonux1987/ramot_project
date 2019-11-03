
const initState = {
  quarterTotal: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_QUARTER_TOTAL":
      return {
        ...state,
        quarterTotal: {
          ...state.quarterTotal,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_QUARTER_TOTAL":
      return {
        ...state,
        quarterTotal: {
          ...state.quarterTotal,
          isFetching: true
        }
      }
    case "QUARTER_TOTAL_FETCHING_FAILED":
      return {
        ...state,
        quarterTotal: {
          ...state.quarterTotal,
          status: "error",
          error: action.payload
        }
      }
    case "CLEANUP_QUARTER_TOTAL":
      return {
        ...state,
        quarterTotal: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}