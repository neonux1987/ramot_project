import { ipcSendReceive } from "./util/util";

export const TYPES = {
  REGISTERED_MONTHS_REQUEST: "REGISTERED_MONTHS_REQUEST",
  REGISTERED_MONTHS_RECEIVE: "REGISTERED_MONTHS_RECEIVE",
  REGISTERED_MONTHS_FETCHING_FAILED: "REGISTERED_MONTHS_FETCHING_FAILED",
  REGISTERED_MONTHS_UPDATE_DATA_COUNT: "REGISTERED_MONTHS_UPDATE_DATA_COUNT",
  REGISTERED_MONTHS_CLEANUP: "REGISTERED_MONTHS_CLEANUP",
  REGISTERED_MONTHS_INIT_PAGE: "REGISTERED_MONTHS_INIT_PAGE",
  REGISTERED_MONTHS_INIT_BUILDING: "REGISTERED_MONTHS_INIT_BUILDING"
}

export const fetchRegisteredMonths = (params = Object) => {
  return dispatch => {
    const { pageName, buildingName } = params;

    //let react know that the fetching is started
    dispatch(requestRegisteredMonths(pageName, buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-registered-months",
        params
      },
      receive: {
        channel: "registered-months-data"
      },
      onSuccess: result => dispatch(receiveRegisteredMonths(result.data, pageName, buildingName)),
      onError: result => dispatch(fetchingFailed(result.error, pageName, buildingName))
    });
  }
};

const requestRegisteredMonths = function (pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_MONTHS_REQUEST,
    pageName,
    buildingName
  }
};

const receiveRegisteredMonths = function (data, pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_MONTHS_RECEIVE,
    data,
    pageName,
    buildingName
  }
}

const fetchingFailed = function (error, pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_MONTHS_FETCHING_FAILED,
    error,
    pageName,
    buildingName
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

export const cleanupMonths = (pageName, buildingName) => {
  return {
    type: TYPES.REGISTERED_MONTHS_CLEANUP,
    pageName,
    buildingName
  }
}

const initPage = function (pageName) {
  return {
    type: TYPES.REGISTERED_MONTHS_INIT_PAGE,
    pageName
  }
};

const initBuilding = function (pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_MONTHS_INIT_BUILDING,
    pageName,
    buildingName
  }
};

export const initRegisteredMonths = (pageName, buildingName) => {
  return (dispatch, getState) => {
    const state = getState();
    const page = state.registeredMonths.pages[pageName];
    if (page === undefined || page[buildingName] === undefined) {
      dispatch(initPage(pageName));
      dispatch(initBuilding(pageName, buildingName));
    }
  }
}