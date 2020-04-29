import { ipcSendReceive } from './util/util';
import { myToasts } from '../../CustomToasts/myToasts';

export const TYPES = {
  REGISTERED_QUARTERS_REQUEST: "REGISTERED_QUARTERS_REQUEST",
  REGISTERED_QUARTERS_RECEIVE: "REGISTERED_QUARTERS_RECEIVE",
  REGISTERED_QUARTERS_FETCHING_FAILED: "REGISTERED_QUARTERS_FETCHING_FAILED",
  REGISTERED_QUARTERS_CLEANUP: "REGISTERED_QUARTERS_CLEANUP"
}

export const fetchRegisteredQuarters = (params = Object) => {
  return dispatch => {
    //let react know that the fetching is started
    dispatch(requestRegisteredQuarters(params.buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-registered-quarters",
        params
      },
      receive: {
        channel: "registered-quarters-data"
      },
      onSuccess: (result) => dispatch(receiveRegisteredQuarters(result.data, params.buildingName)),
      onError: (result) => {
        dispatch(fetchingFailed(result.error));

        myToasts.error(result.error)
      }
    });
  }
};

const requestRegisteredQuarters = function (page) {
  return {
    type: TYPES.REGISTERED_QUARTERS_REQUEST,
    page
  }
};

const receiveRegisteredQuarters = function (data, page) {
  return {
    type: TYPES.REGISTERED_QUARTERS_RECEIVE,
    data,
    page
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.REGISTERED_QUARTERS_FETCHING_FAILED,
    payload: error
  }
};

export const cleanupQuarters = () => {
  return {
    type: TYPES.REGISTERED_QUARTERS_CLEANUP
  }
}