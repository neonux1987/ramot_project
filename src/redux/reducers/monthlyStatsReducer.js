import { TYPES } from '../actions/monthlyStatsActions';

const initState = {
  monthlyStats: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TYPES.RECEIVE_MONTHLY_STATS:
      return {
        ...state,
        monthlyStats: {
          ...state.monthlyStats,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case TYPES.REQUEST_MONTHLY_STATS:
      return {
        ...state,
        monthlyStats: {
          ...state.monthlyStats,
          isFetching: true
        }
      }
    case TYPES.UPDATE_MONTH_STATS_STORE_ONLY: {
      //copy the array
      const monthlyStatsArr = [...state.monthlyStats.data];
      //set the new object
      monthlyStatsArr[action.index] = action.monthStatsObj;

      return {
        ...state,
        monthlyStats: {
          ...state.monthlyStats,
          data: monthlyStatsArr
        }
      }
    }
    case TYPES.MONTHLY_STATS_FETCHING_FAILED:
      return {
        ...state,
        monthlyStats: {
          ...state.monthlyStats,
          status: "error",
          error: action.payload
        }
      }
    case TYPES.CLEANUP_MONTHLY_STATS:
      return {
        ...state,
        monthlyStats: {
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}