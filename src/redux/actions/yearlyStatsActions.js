import { ipcSendReceive } from './util/util';

export const TYPES = {
  YEARLY_STATS_REQUEST: "YEARLY_STATS_REQUEST",
  YEARLY_STATS_RECEIVE: "YEARLY_STATS_RECEIVE",
  YEARLY_STATS_FETCHING_FAILED: "YEARLY_STATS_FETCHING_FAILED",
  YEARLY_STATS_CLEANUP: "YEARLY_STATS_CLEANUP"
}

export const fetchYearStats = (params = Object) => {
  return dispatch => {
    const { buildingName, pageName } = params;

    //let react know that the fetching is started
    dispatch(requestYearlyStats(buildingName, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-year-stats",
        params
      },
      receive: {
        channel: "year-stats"
      },
      onSuccess: result => dispatch(receiveYearlyStats(buildingName, pageName, result.data)),
      onError: result => dispatch(fetchingFailed(buildingName, pageName, result.error))
    });

  }
};

export const fetchYearStatsByYearRange = (params = Object) => {
  return dispatch => {
    const { buildingName, pageName } = params;

    //let react know that the fetching is started
    dispatch(requestYearlyStats(buildingName, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-yearly-stats-by-year-range",
        params
      },
      receive: {
        channel: "yearly-stats-by-year-range"
      },
      onSuccess: result => dispatch(receiveYearlyStats(buildingName, pageName, result.data)),
      onError: result => dispatch(fetchingFailed(buildingName, pageName, result.error))
    });

  }
};

const requestYearlyStats = function (buildingName, pageName) {
  return {
    type: TYPES.YEARLY_STATS_REQUEST,
    buildingName,
    pageName
  }
};

const receiveYearlyStats = function (buildingName, pageName, data) {
  return {
    type: TYPES.YEARLY_STATS_RECEIVE,
    data,
    buildingName,
    pageName
  }
}

const fetchingFailed = function (buildingName, pageName, error) {
  return {
    type: TYPES.YEARLY_STATS_FETCHING_FAILED,
    payload: error,
    buildingName,
    pageName
  }
};

export const cleanupYearlyStats = (buildingName, pageName) => {
  return {
    type: TYPES.YEARLY_STATS_CLEANUP,
    buildingName,
    pageName
  }
}