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
    const { pageName, buildingNameEng } = params;

    //let react know that the fetching is started
    dispatch(requestRegisteredQuarters(pageName, buildingNameEng));

    return ipcSendReceive({
      send: {
        channel: "get-registered-quarters",
        params
      },
      receive: {
        channel: "registered-quarters-data"
      },
      onSuccess: result => dispatch(receiveRegisteredQuarters(result.data, buildingNameEng)),
      onError: result => dispatch(fetchingFailed(result.error, buildingNameEng))
    });
  }
};

const requestRegisteredQuarters = function (buildingNameEng) {
  return {
    type: TYPES.REGISTERED_QUARTERS_REQUEST,
    buildingNameEng
  }
};

const receiveRegisteredQuarters = function (data, buildingNameEng) {
  return {
    type: TYPES.REGISTERED_QUARTERS_RECEIVE,
    data,
    buildingNameEng
  }
}

const fetchingFailed = function (error, buildingNameEng) {
  return {
    type: TYPES.REGISTERED_QUARTERS_FETCHING_FAILED,
    error,
    buildingNameEng
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

export const cleanupQuarters = (buildingNameEng) => {
  return {
    type: TYPES.REGISTERED_QUARTERS_CLEANUP,
    buildingNameEng
  }
}