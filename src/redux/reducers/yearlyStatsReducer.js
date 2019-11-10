
const initState = {
  yearlyStats: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_YEARLY_STATS":
      return {
        ...state,
        yearlyStats: {
          ...state.yearlyStats,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_YEARLY_STATS":
      return {
        ...state,
        yearlyStats: {
          ...state.yearlyStats,
          isFetching: true
        }
      }
    case "YEARLY_STATS_FETCHING_FAILED":
      return {
        ...state,
        yearlyStats: {
          ...state.yearlyStats,
          status: "error",
          error: action.payload
        }
      }
    case "CLEANUP_YEARLY_STATS":
      return {
        ...state,
        yearlyStats: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}