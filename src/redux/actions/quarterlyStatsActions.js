import { myToasts } from "../../CustomToasts/myToasts";
import { ipcSendReceive } from "./util/util";

export const TYPES = {
  REQUEST_QUARTERLY_STATS: "REQUEST_QUARTERLY_STATS",
  RECEIVE_QUARTERLY_STATS: "RECEIVE_QUARTERLY_STATS",
  UPDATE_QUARTER_STATS_STORE_ONLY: "UPDATE_QUARTER_STATS_STORE_ONLY",
  QUARTERLY_STATS_FETCHING_FAILED: "QUARTERLY_STATS_FETCHING_FAILED",
  CLEANUP_QUARTERLY_STATS: "CLEANUP_QUARTERLY_STATS",
}

export const fetchQuarterStats = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestQuarterlyStats());

    return ipcSendReceive({
      send: {
        channel: "get-quarter-stats",
        params
      },
      receive: {
        channel: "quarter-stats"
      },
      onSuccess: (result) => dispatch(receiveQuarterlyStats(result.data)),
      onError: (result) => {
        dispatch(fetchingFailed(result.error));

        myToasts.error(result.error)
      }
    });

  }
};

export const fetchAllQuartersStatsByYear = (params = Object) => {
  return dispatch => {
    //let react know that the fetching is started
    dispatch(requestQuarterlyStats());

    return ipcSendReceive({
      send: {
        channel: "get-all-quarters-stats-by-year",
        params
      },
      receive: {
        channel: "all-quarters-stats-by-year"
      },
      onSuccess: (result) => dispatch(receiveQuarterlyStats(result.data)),
      onError: (result) => {
        dispatch(fetchingFailed(result.error));

        myToasts.error(result.error)
      }
    });

  }
};

const requestQuarterlyStats = function (page) {
  return {
    type: TYPES.REQUEST_QUARTERLY_STATS,
    page
  }
};

const receiveQuarterlyStats = function (data) {
  return {
    type: TYPES.RECEIVE_QUARTERLY_STATS,
    data
  }
}

export const updateQuarterStatsStoreOnly = (quarterStatsObj) => {
  return dispatch => {
    dispatch({
      type: TYPES.UPDATE_QUARTER_STATS_STORE_ONLY,
      quarterStatsObj
    });
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.QUARTERLY_STATS_FETCHING_FAILED,
    payload: error
  }
};

export const cleanupQuarterlyStats = () => {
  return {
    type: TYPES.CLEANUP_QUARTERLY_STATS
  }
}