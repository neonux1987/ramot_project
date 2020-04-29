import { TYPES } from '../actions/quarterlyStatsActions';

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
    case TYPES.RECEIVE_QUARTERLY_STATS:
      return {
        ...state,
        quarterlyStats: {
          ...state.quarterlyStats,
          isFetching: false,
          status: "success",
          data: action.data
        }
      }
    case TYPES.REQUEST_QUARTERLY_STATS:
      return {
        ...state,
        quarterlyStats: {
          ...state.quarterlyStats,
          isFetching: true
        }
      }
    case TYPES.UPDATE_QUARTER_STATS_STORE_ONLY: {
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
    case TYPES.QUARTERLY_STATS_FETCHING_FAILED:
      return {
        ...state,
        quarterlyStats: {
          ...state.quarterlyStats,
          status: "error",
          error: action.payload
        }
      }
    case TYPES.CLEANUP_QUARTERLY_STATS:
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