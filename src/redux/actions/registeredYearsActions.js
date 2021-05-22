import { ipcSendReceive } from './util/util';

// TYPES
export const TYPES = {
  REGISTERED_YEARS_REQUEST: "REGISTERED_YEARS_REQUEST",
  REGISTERED_YEARS_RECEIVE: "REGISTERED_YEARS_RECEIVE",
  REGISTERED_YEARS_FETCHING_FAILED: "REGISTERED_YEARS_FETCHING_FAILED",
  REGISTERED_YEARS_UPDATE_DATA_COUNT: "REGISTERED_YEARS_UPDATE_DATA_COUNT",
  REGISTERED_YEARS_CLEANUP: "REGISTERED_YEARS_CLEANUP",
  REGISTERED_YEARS_ADD_BUILDING_STATE: "REGISTERED_YEARS_ADD_BUILDING_STATE",
  REGISTERED_YEARS_REMOVE_BUILDING_STATE: "REGISTERED_YEARS_REMOVE_BUILDING_STATE"
}

export const fetchRegisteredYears = (params = Object) => {
  return dispatch => {
    const { buildingId } = params;

    //let react know that the fetching is started
    dispatch(requestRegisteredYears(buildingId));

    return ipcSendReceive({
      send: {
        channel: "get-registered-years",
        params
      },
      receive: {
        channel: "registered-years-data"
      },
      onSuccess: result => dispatch(receiveRegisteredYears(result.data, buildingId)),
      onError: result => dispatch(fetchingFailed(result.error, buildingId))
    });

  }
};

const requestRegisteredYears = function (buildingId) {
  return {
    type: TYPES.REGISTERED_YEARS_REQUEST,
    buildingId
  }
};

const receiveRegisteredYears = function (data, buildingId) {
  return {
    type: TYPES.REGISTERED_YEARS_RECEIVE,
    data,
    buildingId
  }
}

const fetchingFailed = function (error, buildingId) {
  return {
    type: TYPES.REGISTERED_YEARS_FETCHING_FAILED,
    error,
    buildingId
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

export const cleanupYears = (buildingId) => {
  return {
    type: TYPES.REGISTERED_YEARS_CLEANUP,
    buildingId
  }
}

export const addBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.REGISTERED_YEARS_ADD_BUILDING_STATE,
    buildingId
  });
}

export const removeBuilding = (buildingId) => {
  return dispatch => dispatch({
    type: TYPES.REGISTERED_YEARS_REMOVE_BUILDING_STATE,
    buildingId
  });
}
