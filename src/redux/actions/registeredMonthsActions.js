import { ipcSendReceive } from "./util/util";

export const TYPES = {
  REGISTERED_MONTHS_REQUEST: "REGISTERED_MONTHS_REQUEST",
  REGISTERED_MONTHS_RECEIVE: "REGISTERED_MONTHS_RECEIVE",
  REGISTERED_MONTHS_FETCHING_FAILED: "REGISTERED_MONTHS_FETCHING_FAILED",
  REGISTERED_MONTHS_UPDATE_DATA_COUNT: "REGISTERED_MONTHS_UPDATE_DATA_COUNT",
  REGISTERED_MONTHS_CLEANUP: "REGISTERED_MONTHS_CLEANUP",
  REGISTERED_MONTHS_ADD_BUILDING_STATE: "REGISTERED_MONTHS_ADD_BUILDING_STATE",
  REGISTERED_MONTHS_REMOVE_BUILDING_STATE: "REGISTERED_MONTHS_REMOVE_BUILDING_STATE"
}

export const fetchRegisteredMonths = (params = Object) => {
  return dispatch => {
    const { buildingId } = params;

    //let react know that the fetching is started
    dispatch(requestRegisteredMonths(buildingId));

    return ipcSendReceive({
      send: {
        channel: "get-registered-months",
        params
      },
      receive: {
        channel: "registered-months-data"
      },
      onSuccess: result => dispatch(receiveRegisteredMonths(result.data, buildingId)),
      onError: result => dispatch(fetchingFailed(result.error, buildingId))
    });
  }
};

const requestRegisteredMonths = function (buildingId) {
  return {
    type: TYPES.REGISTERED_MONTHS_REQUEST,
    buildingId
  }
};

const receiveRegisteredMonths = function (data, buildingId) {
  return {
    type: TYPES.REGISTERED_MONTHS_RECEIVE,
    data,
    buildingId
  }
}

const fetchingFailed = function (error, buildingId) {
  return {
    type: TYPES.REGISTERED_MONTHS_FETCHING_FAILED,
    error,
    buildingId
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

export const cleanupMonths = (buildingId) => {
  return {
    type: TYPES.REGISTERED_MONTHS_CLEANUP,
    buildingId
  }
}

export const addBuilding = (buildingId) => {
  return {
    type: TYPES.REGISTERED_MONTHS_ADD_BUILDING_STATE,
    buildingId
  };
}

export const removeBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.REGISTERED_MONTHS_REMOVE_BUILDING_STATE,
    buildingId
  });
}
