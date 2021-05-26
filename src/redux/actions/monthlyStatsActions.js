import { ipcSendReceive } from './util/util';

export const TYPES = {
  REQUEST_MONTHLY_STATS: "REQUEST_MONTHLY_STATS",
  RECEIVE_MONTHLY_STATS: "RECEIVE_MONTHLY_STATS",
  MONTHLY_STATS_FETCHING_FAILED: "MONTHLY_STATS_FETCHING_FAILED",
  CLEANUP_MONTHLY_STATS: "CLEANUP_MONTHLY_STATS",
  UPDATE_MONTH_STATS_STORE_ONLY: "UPDATE_MONTH_STATS_STORE_ONLY",
  MONTHLY_STATS_ADD_BUILDING_STATE: "MONTHLY_STATS_ADD_BUILDING_STATE",
  MONTHLY_STATS_REMOVE_BUILDING_STATE: "MONTHLY_STATS_REMOVE_BUILDING_STATE"
}

export const fetchAllMonthsStatsByQuarter = (params = Object) => {
  return dispatch => {
    const { buildingId, pageName } = params;
    //let react know that the fetching is started
    dispatch(requestMonthlyStats(buildingId, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-all-months-stats-by-quarter",
        params
      },
      receive: {
        channel: "all-months-stats-by-quarter"
      },
      onSuccess: (result) => dispatch(receiveMonthlyStats(buildingId, pageName, result.data)),
      onError: (result) => dispatch(fetchingFailed(buildingId, pageName, result.error))
    });

  }
};

export const fetchAllMonthsStatsByYear = (params = Object) => {
  return dispatch => {
    const { buildingId, pageName } = params;
    //let react know that the fetching is started
    dispatch(requestMonthlyStats(buildingId, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-all-months-stats-by-year",
        params
      },
      receive: {
        channel: "all-months-stats-by-year"
      },
      onSuccess: (result) => dispatch(receiveMonthlyStats(buildingId, pageName, result.data)),
      onError: (result) => dispatch(fetchingFailed(buildingId, pageName, result.error))
    });

  }
};

export const updateMonthStatsStoreOnly = (buildingId, pageName, monthStatsObj, index) => {
  return dispatch => {
    dispatch({
      type: TYPES.UPDATE_MONTH_STATS_STORE_ONLY,
      monthStatsObj,
      index,
      buildingId,
      pageName
    });
  }
}

const requestMonthlyStats = function (buildingId, pageName) {
  return {
    type: TYPES.REQUEST_MONTHLY_STATS,
    buildingId,
    pageName
  }
};

const receiveMonthlyStats = function (buildingId, pageName, data) {
  return {
    type: TYPES.RECEIVE_MONTHLY_STATS,
    data,
    buildingId,
    pageName
  }
}

const fetchingFailed = function (buildingId, pageName, error) {
  return {
    type: TYPES.MONTHLY_STATS_FETCHING_FAILED,
    payload: error,
    buildingId,
    pageName
  }
};

export const cleanupMonthlyStats = (buildingId, pageName) => {
  return {
    type: TYPES.CLEANUP_MONTHLY_STATS,
    buildingId,
    pageName
  }
}

export const addBuilding = (buildingId) => {
  return {
    type: TYPES.MONTHLY_STATS_ADD_BUILDING_STATE,
    buildingId
  };
}

export const removeBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.MONTHLY_STATS_REMOVE_BUILDING_STATE,
    buildingId
  });
}