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
  return (dispatch, getState) => {
    const { pageName, buildingName } = params;

    //let react know that the fetching is started
    dispatch(requestRegisteredQuarters(pageName, buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-registered-quarters",
        params
      },
      receive: {
        channel: "registered-quarters-data"
      },
      onSuccess: result => dispatch(receiveRegisteredQuarters(result.data, pageName, buildingName)),
      onError: result => dispatch(fetchingFailed(result.error, pageName, buildingName))
    });
  }
};

const requestRegisteredQuarters = function (pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_QUARTERS_REQUEST,
    pageName,
    buildingName
  }
};

const receiveRegisteredQuarters = function (data, pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_QUARTERS_RECEIVE,
    data,
    pageName,
    buildingName
  }
}

const fetchingFailed = function (error, pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_QUARTERS_FETCHING_FAILED,
    error,
    pageName, buildingName
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

export const cleanupQuarters = (pageName, buildingName) => {
  return {
    type: TYPES.REGISTERED_QUARTERS_CLEANUP,
    pageName, buildingName
  }
}

const initPage = function (pageName) {
  return {
    type: TYPES.REGISTERED_QUARTERS_INIT_PAGE,
    pageName
  }
};

const initBuilding = function (pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_QUARTERS_INIT_BUILDING,
    pageName,
    buildingName
  }
};

export const initRegisteredQuarters = (pageName, buildingName) => {
  return (dispatch, getState) => {
    const state = getState();
    const page = state.registeredQuarters.pages[pageName];
    if (page === undefined || page[buildingName] === undefined) {
      dispatch(initPage(pageName));
      dispatch(initBuilding(pageName, buildingName));
    }
  }
}