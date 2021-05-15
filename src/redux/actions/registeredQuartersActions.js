import { ipcSendReceive } from './util/util';

export const TYPES = {
  REGISTERED_QUARTERS_REQUEST: "REGISTERED_QUARTERS_REQUEST",
  REGISTERED_QUARTERS_RECEIVE: "REGISTERED_QUARTERS_RECEIVE",
  REGISTERED_QUARTERS_FETCHING_FAILED: "REGISTERED_QUARTERS_FETCHING_FAILED",
  REGISTERED_QUARTERS_UPDATE_DATA_COUNT: "REGISTERED_QUARTERS_UPDATE_DATA_COUNT",
  REGISTERED_QUARTERS_CLEANUP: "REGISTERED_QUARTERS_CLEANUP",
  REGISTERED_QUARTERS_INIT_PAGE: "REGISTERED_QUARTERS_INIT_PAGE",
  REGISTERED_QUARTERS_INIT_BUILDING: "REGISTERED_QUARTERS_INIT_BUILDING"
}

export const fetchRegisteredQuarters = (params = Object) => {
  return dispatch => {
    const { pageName, buildingId } = params;

    //let react know that the fetching is started
    dispatch(requestRegisteredQuarters(pageName, buildingId));

    return ipcSendReceive({
      send: {
        channel: "get-registered-quarters",
        params
      },
      receive: {
        channel: "registered-quarters-data"
      },
      onSuccess: result => dispatch(receiveRegisteredQuarters(result.data, buildingId)),
      onError: result => dispatch(fetchingFailed(result.error, buildingId))
    });
  }
};

const requestRegisteredQuarters = function (buildingId) {
  return {
    type: TYPES.REGISTERED_QUARTERS_REQUEST,
    buildingId
  }
};

const receiveRegisteredQuarters = function (data, buildingId) {
  return {
    type: TYPES.REGISTERED_QUARTERS_RECEIVE,
    data,
    buildingId
  }
}

const fetchingFailed = function (error, buildingId) {
  return {
    type: TYPES.REGISTERED_QUARTERS_FETCHING_FAILED,
    error,
    buildingId
  }
};

export const registeredQuartersUpdateDataCount = (dataCount) => {
  return dispatch => {
    dispatch({
      type: TYPES.REGISTERED_QUARTERS_UPDATE_DATA_COUNT,
      dataCount
    })
  }
}

export const cleanupQuarters = (buildingId) => {
  return {
    type: TYPES.REGISTERED_QUARTERS_CLEANUP,
    buildingId
  }
}