import { ipcSendReceive } from './util/util';
import { myToasts } from '../../CustomToasts/myToasts';

export const TYPES = {
  SIDEBAR_REQUEST: "REQUEST_SIDEBAR",
  SIDEBAR_RECEIVE: "SIDEBAR_RECEIVE",
  SIDEBAR_FETCHING_FAILED: "SIDEBAR_FETCHING_FAILED",
  SIDEBAR_TOGGLE: "SIDEBAR_TOGGLE",
}

export const toggleSidebar = () => ({
  type: TYPES.SIDEBAR_TOGGLE
});

export const fetchSidebar = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSidebar());

    return ipcSendReceive({
      send: {
        channel: "get-menu"
      },
      receive: {
        channel: "menu-data"
      },
      onSuccess: result => dispatch(receiveSidebar(result.data)),
      onError: result => dispatch(fetchingFailed(result.error))
    });

  }
};

const requestSidebar = function () {
  return {
    type: TYPES.SIDEBAR_REQUEST
  }
};

const receiveSidebar = function (data) {
  return {
    type: TYPES.SIDEBAR_RECEIVE,
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.SIDEBAR_FETCHING_FAILED,
    payload: error
  }
};