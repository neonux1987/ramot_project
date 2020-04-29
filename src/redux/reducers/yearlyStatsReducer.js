import { TYPES } from '../actions/yearlyStatsActions';
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
    case TYPES.YEARLY_STATS_RECEIVE:
      return {
        ...state,
        yearlyStats: {
          ...state.yearlyStats,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case TYPES.YEARLY_STATS_REQUEST:
      return {
        ...state,
        yearlyStats: {
          ...state.yearlyStats,
          isFetching: true
        }
      }
    case TYPES.YEARLY_STATS_FETCHING_FAILED:
      return {
        ...state,
        yearlyStats: {
          ...state.yearlyStats,
          status: "error",
          error: action.payload
        }
      }
    case TYPES.YEARLY_STATS_CLEANUP:
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