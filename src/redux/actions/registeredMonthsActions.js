import { ipcSendReceive } from "./util/util";
import { myToasts } from "../../CustomToasts/myToasts";

export const TYPES = {
  REGISTERED_MONTHS_REQUEST: "REGISTERED_MONTHS_REQUEST",
  REGISTERED_MONTHS_RECEIVE: "REGISTERED_MONTHS_RECEIVE",
  REGISTERED_MONTHS_FETCHING_FAILED: "REGISTERED_MONTHS_FETCHING_FAILED",
  REGISTERED_MONTHS_CLEANUP: "REGISTERED_MONTHS_CLEANUP"
}

export const fetchRegisteredMonths = (params = Object) => {
  return dispatch => {
    //let react know that the fetching is started
    dispatch(requestRegisteredMonths(params.buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-registered-months",
        params
      },
      receive: {
        channel: "registered-months-data"
      },
      onSuccess: (result) => dispatch(receiveRegisteredMonths(result.data, params.buildingName)),
      onError: (result) => {
        dispatch(fetchingFailed(result.error));

        myToasts.error(result.error)
      }
    });
  }
};

const requestRegisteredMonths = function (page) {
  return {
    type: TYPES.REGISTERED_MONTHS_REQUEST,
    page
  }
};

const receiveRegisteredMonths = function (data, page) {
  return {
    type: TYPES.REGISTERED_MONTHS_RECEIVE,
    data,
    page
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.REGISTERED_MONTHS_FETCHING_FAILED,
    payload: error
  }
};

export const cleanupMonths = () => {
  return {
    type: TYPES.REGISTERED_MONTHS_CLEANUP
  }
}