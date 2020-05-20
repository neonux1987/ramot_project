import { ipcSendReceive } from './util/util';

// TYPES
export const TYPES = {
  REGISTERED_YEARS_REQUEST: "REGISTERED_YEARS_REQUEST",
  REGISTERED_YEARS_RECEIVE: "REGISTERED_YEARS_RECEIVE",
  REGISTERED_YEARS_FETCHING_FAILED: "REGISTERED_YEARS_FETCHING_FAILED",
  REGISTERED_YEARS_CLEANUP: "REGISTERED_YEARS_CLEANUP",
  REGISTERED_YEARS_INIT: "REGISTERED_YEARS_INIT"
}

export const fetchRegisteredYears = (buildingName, pageName) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestRegisteredYears(buildingName, pageName));

    return ipcSendReceive({
      send: {
        channel: "get-registered-years",
        params: { buildingName }
      },
      receive: {
        channel: "registered-years-data"
      },
      onSuccess: result => dispatch(receiveRegisteredYears(result.data, buildingName, pageName)),
      onError: result => dispatch(fetchingFailed(result.error, buildingName, pageName))
    });

  }
};

const requestRegisteredYears = function (buildingName, pageName) {
  return {
    type: TYPES.REGISTERED_YEARS_REQUEST,
    buildingName,
    pageName
  }
};

const receiveRegisteredYears = function (data, buildingName, pageName) {
  return {
    type: TYPES.REGISTERED_YEARS_RECEIVE,
    data,
    buildingName,
    pageName
  }
}

const fetchingFailed = function (error, buildingName, pageName) {
  return {
    type: TYPES.REGISTERED_YEARS_FETCHING_FAILED,
    error,
    buildingName,
    pageName
  }
};

export const cleanupYears = (buildingName, pageName) => {
  return {
    type: TYPES.REGISTERED_YEARS_CLEANUP,
    buildingName,
    pageName
  }
}

export const initRegisteredYears = (buildingName, pageName) => {
  return {
    type: TYPES.REGISTERED_YEARS_INIT,
    buildingName,
    pageName
  }
};