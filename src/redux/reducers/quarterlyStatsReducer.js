
const initState = {
  quarterlyStats: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_QUARTERLY_STATS":
      return {
        ...state,
        quarterlyStats: {
          ...state.quarterlyStats,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_QUARTERLY_STATS":
      return {
        ...state,
        quarterlyStats: {
          ...state.quarterlyStats,
          isFetching: true
        }
      }
    case "UPDATE_QUARTER_STATS_STORE_ONLY": {
      //create new array with the new object
      const newDataArray = [action.quarterStatsObj];
      return {
        ...state,
        quarterlyStats: {
          ...state.quarterlyStats,
          data: newDataArray
        }
      }
    }
    case "QUARTERLY_STATS_FETCHING_FAILED":
      return {
        ...state,
        quarterlyStats: {
          ...state.quarterlyStats,
          status: "error",
          error: action.payload
        }
      }
    case "CLEANUP_QUARTERLY_STATS":
      return {
        ...state,
        quarterlyStats: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}