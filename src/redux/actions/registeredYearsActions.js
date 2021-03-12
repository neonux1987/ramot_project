import { ipcSendReceive } from './util/util';

// TYPES
export const TYPES = {
  REGISTERED_YEARS_REQUEST: "REGISTERED_YEARS_REQUEST",
  REGISTERED_YEARS_RECEIVE: "REGISTERED_YEARS_RECEIVE",
  REGISTERED_YEARS_FETCHING_FAILED: "REGISTERED_YEARS_FETCHING_FAILED",
  REGISTERED_YEARS_UPDATE_DATA_COUNT: "REGISTERED_YEARS_UPDATE_DATA_COUNT",
  REGISTERED_YEARS_CLEANUP: "REGISTERED_YEARS_CLEANUP"
}

export const fetchRegisteredYears = (params = Object) => {
  return dispatch => {
    const { buildingNameEng } = params;

    //let react know that the fetching is started
    dispatch(requestRegisteredYears(buildingNameEng));

    return ipcSendReceive({
      send: {
        channel: "get-registered-years",
        params
      },
      receive: {
        channel: "registered-years-data"
      },
      onSuccess: result => dispatch(receiveRegisteredYears(result.data, buildingNameEng)),
      onError: result => dispatch(fetchingFailed(result.error, buildingNameEng))
    });

  }
};

const requestRegisteredYears = function (buildingNameEng) {
  return {
    type: TYPES.REGISTERED_YEARS_REQUEST,
    buildingNameEng
  }
};

const receiveRegisteredYears = function (data, buildingNameEng) {
  return {
    type: TYPES.REGISTERED_YEARS_RECEIVE,
    data,
    buildingNameEng
  }
}

const fetchingFailed = function (error, buildingNameEng) {
  return {
    type: TYPES.REGISTERED_YEARS_FETCHING_FAILED,
    error,
    buildingNameEng
  }
};

export const registeredYearsUpdateDataCount = (dataCount) => {
  return dispatch => {
    dispatch({
      type: TYPES.REGISTERED_YEARS_UPDATE_DATA_COUNT,
      dataCount
    })
  }
}

export const cleanupYears = (buildingNameEng) => {
  return {
    type: TYPES.REGISTERED_YEARS_CLEANUP,
    buildingNameEng
  }
}