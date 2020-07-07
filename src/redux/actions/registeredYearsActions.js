import { ipcSendReceive } from './util/util';

// TYPES
export const TYPES = {
  REGISTERED_YEARS_REQUEST: "REGISTERED_YEARS_REQUEST",
  REGISTERED_YEARS_RECEIVE: "REGISTERED_YEARS_RECEIVE",
  REGISTERED_YEARS_FETCHING_FAILED: "REGISTERED_YEARS_FETCHING_FAILED",
  REGISTERED_YEARS_UPDATE_DATA_COUNT: "REGISTERED_YEARS_UPDATE_DATA_COUNT",
  REGISTERED_YEARS_CLEANUP: "REGISTERED_YEARS_CLEANUP",
  REGISTERED_YEARS_INIT_PAGE: "REGISTERED_YEARS_INIT_PAGE",
  REGISTERED_YEARS_INIT_BUILDING: "REGISTERED_YEARS_INIT_BUILDING"
}

export const fetchRegisteredYears = (params = Object) => {
  return (dispatch, getState) => {
    const { pageName, buildingName } = params;
    //let react know that the fetching is started
    dispatch(requestRegisteredYears(pageName, buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-registered-years",
        params
      },
      receive: {
        channel: "registered-years-data"
      },
      onSuccess: result => dispatch(receiveRegisteredYears(result.data, pageName, buildingName)),
      onError: result => dispatch(fetchingFailed(result.error, pageName, buildingName))
    });

  }
};

const requestRegisteredYears = function (pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_YEARS_REQUEST,
    pageName,
    buildingName
  }
};

const receiveRegisteredYears = function (data, pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_YEARS_RECEIVE,
    data,
    pageName,
    buildingName
  }
}

const fetchingFailed = function (error, pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_YEARS_FETCHING_FAILED,
    error,
    pageName,
    buildingName
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

export const cleanupYears = (pageName, buildingName) => {
  return {
    type: TYPES.REGISTERED_YEARS_CLEANUP,
    pageName,
    buildingName
  }
}

const initPage = function (pageName) {
  return {
    type: TYPES.REGISTERED_YEARS_INIT_PAGE,
    pageName
  }
};

const initBuilding = function (pageName, buildingName) {
  return {
    type: TYPES.REGISTERED_YEARS_INIT_BUILDING,
    pageName,
    buildingName
  }
};

export const initRegisteredYears = (pageName, buildingName) => {
  return (dispatch, getState) => {

    return new Promise((resolve) => {

      const state = getState();
      const page = state.registeredYears.pages[pageName];
      if (page === undefined || page[buildingName] === undefined) {
        dispatch(initPage(pageName));
        dispatch(initBuilding(pageName, buildingName));
        resolve();
      }

    });

  }
}