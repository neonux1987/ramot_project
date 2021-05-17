import { TYPES } from '../actions/homeActions';

const initState = {
  yearlyStats: {
    isFetching: false,
    status: "",
    error: "",
    data: []
  }
};

const YearlyStatsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.HOME_YEARLY_STATS_RECEIVE:
      return {
        ...state,
        yearlyStats: {
          ...state.yearlyStats,
          isFetching: false,
          status: "success",
          data: action.data
        }
      };
    case TYPES.HOME_YEARLY_STATS_REQUEST:
      return {
        ...state,
        yearlyStats: {
          ...state.yearlyStats,
          isFetching: true
        }
      }
    case TYPES.HOME_YEARLY_STATS_FETCHING_FAILED:
      return {
        ...state,
        yearlyStats: {
          ...state.yearlyStats,
          status: "error",
          error: action.payload
        }
      }
    case TYPES.HOME_YEARLY_STATS_CLEANUP:
      return {
        ...state,
        yearlyStats: {
          ...state.yearlyStats,
          isFetching: false,
          status: "",
          error: "",
          data: []
        }
      }
    default: return state;
  }
}

export default YearlyStatsReducer;