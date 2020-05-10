import { ipcSendReceive } from './util/util';
import { myToasts } from '../../CustomToasts/myToasts';

// TYPES
export const TYPES = {
  REGISTERED_YEARS_REQUEST: "REGISTERED_YEARS_REQUEST",
  REGISTERED_YEARS_RECEIVE: "REGISTERED_YEARS_RECEIVE",
  REGISTERED_YEARS_FETCHING_FAILED: "REGISTERED_YEARS_FETCHING_FAILED",
  REGISTERED_YEARS_CLEANUP: "REGISTERED_YEARS_CLEANUP"
}

export const fetchRegisteredYears = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestRegisteredYears(params.buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-registered-years",
        params
      },
      receive: {
        channel: "registered-years-data"
      },
      onSuccess: result => dispatch(receiveRegisteredYears(result.data, params.buildingName)),
      onError: result => dispatch(fetchingFailed(result.error))
    });

  }
};

const requestRegisteredYears = function (page) {
  return {
    type: TYPES.REGISTERED_YEARS_REQUEST,
    page
  }
};

const receiveRegisteredYears = function (data, page) {
  return {
    type: TYPES.REGISTERED_YEARS_RECEIVE,
    data,
    page
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.REGISTERED_YEARS_FETCHING_FAILED,
    payload: error
  }
};

export const cleanupYears = () => {
  return {
    type: TYPES.REGISTERED_YEARS_CLEANUP
  }
}