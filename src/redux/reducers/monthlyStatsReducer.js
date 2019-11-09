
const initState = {
  monthStats: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_MONTH_STATS":
      return {
        ...state,
        monthStats: {
          ...state.monthStats,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case "REQUEST_MONTH_STATS":
      return {
        ...state,
        monthStats: {
          ...state.monthStats,
          isFetching: true
        }
      }
    case "UPDATE_MONTH_STATS_STORE_ONLY": {
      //copy the array
      const monthStatsArr = [...state.monthStats.data];
      //set the new object
      monthStatsArr[action.index] = action.monthStatsObj;

      return {
        ...state,
        monthStats: {
          ...state.monthStats,
          data: monthStatsArr
        }
      }
    }
    case "MONTH_STATS_FETCHING_FAILED":
      return {
        ...state,
        monthStats: {
          ...state.monthStats,
          status: "error",
          error: action.payload
        }
      }
    case "CLEANUP_MONTH_STATS":
      return {
        ...state,
        monthStats: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}