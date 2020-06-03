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
    const { buildingName, pageName } = params;
    //let react know that the fetching is started
    dispatch(requestQuarterlyStats(buildingName, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-quarter-stats",
        params
      },
      receive: {
        channel: "quarter-stats"
      },
      onSuccess: result => dispatch(receiveQuarterlyStats(buildingName, pageName, result.data)),
      onError: result => dispatch(fetchingFailed(buildingName, pageName, result.error))
    });

  }
};

export const fetchAllQuartersStatsByYear = (params = Object) => {
  return dispatch => {
    const { buildingName, pageName } = params;

    //let react know that the fetching is started
    dispatch(requestQuarterlyStats(buildingName, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-all-quarters-stats-by-year",
        params
      },
      receive: {
        channel: "all-quarters-stats-by-year"
      },
      onSuccess: result => dispatch(receiveQuarterlyStats(buildingName, pageName, result.data)),
      onError: result => dispatch(fetchingFailed(buildingName, pageName, result.error))
    });

  }
};

const requestQuarterlyStats = function (buildingName, pageName) {
  return {
    type: TYPES.REQUEST_QUARTERLY_STATS,
    buildingName,
    pageName
  }
};

const receiveQuarterlyStats = function (buildingName, pageName, data) {
  return {
    type: TYPES.RECEIVE_QUARTERLY_STATS,
    data,
    buildingName, pageName
  }
}

export const updateQuarterStatsStoreOnly = (buildingName, pageName, quarterStatsObj) => {
  return dispatch => {
    dispatch({
      type: TYPES.UPDATE_QUARTER_STATS_STORE_ONLY,
      quarterStatsObj,
      buildingName,
      pageName
    });
  }
}

const fetchingFailed = function (buildingName, pageName, error) {
  return {
    type: TYPES.QUARTERLY_STATS_FETCHING_FAILED,
    payload: error,
    buildingName,
    pageName
  }
};

export const cleanupQuarterlyStats = (buildingName, pageName) => {
  return {
    type: TYPES.CLEANUP_QUARTERLY_STATS,
    buildingName,
    pageName
  }
}