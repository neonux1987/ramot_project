import { ipcSendReceive } from "./util/util";

export const TYPES = {
  REQUEST_QUARTERLY_STATS: "REQUEST_QUARTERLY_STATS",
  RECEIVE_QUARTERLY_STATS: "RECEIVE_QUARTERLY_STATS",
  UPDATE_QUARTER_STATS_STORE_ONLY: "UPDATE_QUARTER_STATS_STORE_ONLY",
  QUARTERLY_STATS_FETCHING_FAILED: "QUARTERLY_STATS_FETCHING_FAILED",
  CLEANUP_QUARTERLY_STATS: "CLEANUP_QUARTERLY_STATS",
  QUARTERLY_STATS_ADD_BUILDING_STATE: "QUARTERLY_STATS_ADD_BUILDING_STATE",
  QUARTERLY_STATS_REMOVE_BUILDING_STATE: "QUARTERLY_STATS_REMOVE_BUILDING_STATE"
}

export const fetchQuarterStats = (params = Object) => {
  return dispatch => {
    const { buildingId, pageName } = params;
    //let react know that the fetching is started
    dispatch(requestQuarterlyStats(buildingId, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-quarter-stats",
        params
      },
      receive: {
        channel: "quarter-stats"
      },
      onSuccess: result => dispatch(receiveQuarterlyStats(buildingId, pageName, result.data)),
      onError: result => dispatch(fetchingFailed(buildingId, pageName, result.error))
    });

  }
};

export const fetchAllQuartersStatsByYear = (params = Object) => {
  return dispatch => {
    const { buildingId, pageName } = params;

    //let react know that the fetching is started
    dispatch(requestQuarterlyStats(buildingId, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-all-quarters-stats-by-year",
        params
      },
      receive: {
        channel: "all-quarters-stats-by-year"
      },
      onSuccess: result => dispatch(receiveQuarterlyStats(buildingId, pageName, result.data)),
      onError: result => dispatch(fetchingFailed(buildingId, pageName, result.error))
    });

  }
};

const requestQuarterlyStats = function (buildingId, pageName) {
  return {
    type: TYPES.REQUEST_QUARTERLY_STATS,
    buildingId,
    pageName
  }
};

const receiveQuarterlyStats = function (buildingId, pageName, data) {
  return {
    type: TYPES.RECEIVE_QUARTERLY_STATS,
    data,
    buildingId, pageName
  }
}

export const updateQuarterStatsStoreOnly = (buildingId, pageName, quarterStatsObj) => {
  return dispatch => {
    dispatch({
      type: TYPES.UPDATE_QUARTER_STATS_STORE_ONLY,
      quarterStatsObj,
      buildingId,
      pageName
    });
  }
}

const fetchingFailed = function (buildingId, pageName, error) {
  return {
    type: TYPES.QUARTERLY_STATS_FETCHING_FAILED,
    payload: error,
    buildingId,
    pageName
  }
};

export const cleanupQuarterlyStats = (buildingId, pageName) => {
  return {
    type: TYPES.CLEANUP_QUARTERLY_STATS,
    buildingId,
    pageName
  }
}

export const addBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.QUARTERLY_STATS_ADD_BUILDING_STATE,
    buildingId
  });
}

export const removeBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.QUARTERLY_STATS_REMOVE_BUILDING_STATE,
    buildingId
  });
}
