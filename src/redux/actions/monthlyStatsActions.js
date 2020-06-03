import { ipcSendReceive } from './util/util';

export const TYPES = {
  REQUEST_MONTHLY_STATS: "REQUEST_MONTHLY_STATS",
  RECEIVE_MONTHLY_STATS: "RECEIVE_MONTHLY_STATS",
  MONTHLY_STATS_FETCHING_FAILED: "MONTHLY_STATS_FETCHING_FAILED",
  CLEANUP_MONTHLY_STATS: "CLEANUP_MONTHLY_STATS",
  UPDATE_MONTH_STATS_STORE_ONLY: "UPDATE_MONTH_STATS_STORE_ONLY"
}

export const fetchAllMonthsStatsByQuarter = (params = Object) => {
  return dispatch => {
    const { buildingName, pageName } = params;
    //let react know that the fetching is started
    dispatch(requestMonthlyStats(buildingName, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-all-months-stats-by-quarter",
        params
      },
      receive: {
        channel: "all-months-stats-by-quarter"
      },
      onSuccess: (result) => dispatch(receiveMonthlyStats(buildingName, pageName, result.data)),
      onError: (result) => dispatch(fetchingFailed(buildingName, pageName, result.error))
    });

  }
};

export const updateMonthStatsStoreOnly = (buildingName, pageName, monthStatsObj, index) => {
  return dispatch => {
    dispatch({
      type: TYPES.UPDATE_MONTH_STATS_STORE_ONLY,
      monthStatsObj,
      index,
      buildingName,
      pageName
    });
  }
}

const requestMonthlyStats = function (buildingName, pageName) {
  return {
    type: TYPES.REQUEST_MONTHLY_STATS,
    buildingName,
    pageName
  }
};

const receiveMonthlyStats = function (buildingName, pageName, data) {
  return {
    type: TYPES.RECEIVE_MONTHLY_STATS,
    data,
    buildingName,
    pageName
  }
}

const fetchingFailed = function (buildingName, pageName, error) {
  return {
    type: TYPES.MONTHLY_STATS_FETCHING_FAILED,
    payload: error,
    buildingName,
    pageName
  }
};

export const cleanupMonthlyStats = (buildingName, pageName) => {
  return {
    type: TYPES.CLEANUP_MONTHLY_STATS,
    buildingName,
    pageName
  }
}