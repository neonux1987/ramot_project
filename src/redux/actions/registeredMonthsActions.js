import { ipcSendReceive } from "./util/util";

export const TYPES = {
  REGISTERED_MONTHS_REQUEST: "REGISTERED_MONTHS_REQUEST",
  REGISTERED_MONTHS_RECEIVE: "REGISTERED_MONTHS_RECEIVE",
  REGISTERED_MONTHS_FETCHING_FAILED: "REGISTERED_MONTHS_FETCHING_FAILED",
  REGISTERED_MONTHS_UPDATE_DATA_COUNT: "REGISTERED_MONTHS_UPDATE_DATA_COUNT",
  REGISTERED_MONTHS_CLEANUP: "REGISTERED_MONTHS_CLEANUP"
}

export const fetchRegisteredMonths = (params = Object) => {
  return dispatch => {
    const { buildingNameEng } = params;

    //let react know that the fetching is started
    dispatch(requestRegisteredMonths(buildingNameEng));

    return ipcSendReceive({
      send: {
        channel: "get-registered-months",
        params
      },
      receive: {
        channel: "registered-months-data"
      },
      onSuccess: result => dispatch(receiveRegisteredMonths(result.data, buildingNameEng)),
      onError: result => dispatch(fetchingFailed(result.error, buildingNameEng))
    });
  }
};

const requestRegisteredMonths = function (buildingNameEng) {
  return {
    type: TYPES.REGISTERED_MONTHS_REQUEST,
    buildingNameEng
  }
};

const receiveRegisteredMonths = function (data, buildingNameEng) {
  return {
    type: TYPES.REGISTERED_MONTHS_RECEIVE,
    data,
    buildingNameEng
  }
}

const fetchingFailed = function (error, buildingNameEng) {
  return {
    type: TYPES.REGISTERED_MONTHS_FETCHING_FAILED,
    error,
    buildingNameEng
  }
};

export const registeredMonthsUpdateDataCount = (dataCount) => {
  return dispatch => {
    dispatch({
      type: TYPES.REGISTERED_MONTHS_UPDATE_DATA_COUNT,
      dataCount
    })
  }
}

export const cleanupMonths = (buildingNameEng) => {
  return {
    type: TYPES.REGISTERED_MONTHS_CLEANUP,
    buildingNameEng
  }
}