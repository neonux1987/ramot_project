import { myToasts } from '../../CustomToasts/myToasts';
import { ipcSendReceive } from './util/util';

// TYPES
export const TYPES = {
  REGISTERED_REPORTS_REQUEST: "REGISTERED_REPORTS_REQUEST",
  REGISTERED_REPORTS_RECEIVE: "REGISTERED_REPORTS_RECEIVE",
  REGISTERED_REPORTS_FETCHING_FAILED: "REGISTERED_REPORTS_FETCHING_FAILED",
  REGISTERED_REPORTS_CLEANUP: "REGISTERED_REPORTS_CLEANUP"
}

export const fetchRegisteredReports = (params = Object) => {
  return dispatch => {
    //let react know that the fetching is started
    dispatch(requestRegisteredReports(params.buildingName));

    return ipcSendReceive({
      send: {
        channel: "get-registered-reports-grouped-by-year",
        params
      },
      receive: {
        channel: "registered-reports-grouped-by-year-data"
      },
      onSuccess: result => dispatch(receiveRegisteredReports(result.data, params.buildingName)),
      onError: result => dispatch(fetchingFailed(result.error))
    });
  }
};

export const requestRegisteredReports = function (page) {
  return {
    type: TYPES.REGISTERED_REPORTS_REQUEST,
    page
  }
};

export const receiveRegisteredReports = function (data, page) {
  return {
    type: TYPES.REGISTERED_REPORTS_RECEIVE,
    data,
    page
  }
}

export const fetchingFailed = function (error) {
  return {
    type: TYPES.REGISTERED_REPORTS_FETCHING_FAILED,
    payload: error
  }
};

export const cleanupRegisteredReports = () => {
  return {
    type: TYPES.REGISTERED_REPORTS_CLEANUP
  }
}