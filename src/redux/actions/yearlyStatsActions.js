import { ipcSendReceive } from './util/util';

export const TYPES = {
  YEARLY_STATS_REQUEST: "YEARLY_STATS_REQUEST",
  YEARLY_STATS_RECEIVE: "YEARLY_STATS_RECEIVE",
  YEARLY_STATS_FETCHING_FAILED: "YEARLY_STATS_FETCHING_FAILED",
  YEARLY_STATS_CLEANUP: "YEARLY_STATS_CLEANUP",
  YEARLY_STATS_ADD_BUILDING_STATE: "YEARLY_STATS_ADD_BUILDING_STATE"
}

export const fetchYearStats = (params = Object) => {
  return dispatch => {
    const { buildingId, pageName } = params;

    //let react know that the fetching is started
    dispatch(requestYearlyStats(buildingId, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-year-stats",
        params
      },
      receive: {
        channel: "year-stats"
      },
      onSuccess: result => dispatch(receiveYearlyStats(buildingId, pageName, result.data)),
      onError: result => dispatch(fetchingFailed(buildingId, pageName, result.error))
    });

  }
};

export const fetchYearStatsByYearRange = (params = Object) => {
  return dispatch => {
    const { buildingId, pageName } = params;

    //let react know that the fetching is started
    dispatch(requestYearlyStats(buildingId, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-yearly-stats-by-year-range",
        params
      },
      receive: {
        channel: "yearly-stats-by-year-range"
      },
      onSuccess: result => dispatch(receiveYearlyStats(buildingId, pageName, result.data)),
      onError: result => dispatch(fetchingFailed(buildingId, pageName, result.error))
    });

  }
};

const requestYearlyStats = function (buildingId, pageName) {
  return {
    type: TYPES.YEARLY_STATS_REQUEST,
    buildingId,
    pageName
  }
};



const receiveYearlyStats = function (buildingId, pageName, data) {
  return {
    type: TYPES.YEARLY_STATS_RECEIVE,
    data,
    buildingId,
    pageName
  }
}

const fetchingFailed = function (buildingId, pageName, error) {
  return {
    type: TYPES.YEARLY_STATS_FETCHING_FAILED,
    payload: error,
    buildingId,
    pageName
  }
};

export const cleanupYearlyStats = (buildingId, pageName) => {
  return {
    type: TYPES.YEARLY_STATS_CLEANUP,
    buildingId,
    pageName
  }
}

export const addBuildingState = (buildingId) => {
  return {
    type: TYPES.YEARLY_STATS_ADD_BUILDING_STATE,
    buildingId
  }
}
