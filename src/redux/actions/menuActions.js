import { ipcSendReceive } from './util/util';

export const TYPES = {
  MENU_REQUEST: "MENU_REQUEST",
  MENU_RECEIVE: "MENU_RECEIVE",
  MENU_FETCHING_FAILED: "MENU_FETCHING_FAILED"
}


export const fetchMenu = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestMenu());

    return ipcSendReceive({
      send: {
        channel: "get-menu"
      },
      receive: {
        channel: "menu-data"
      },
      onSuccess: result => dispatch(receiveMenu(result.data)),
      onError: result => dispatch(fetchingFailed(result.error))
    });

  }
};

const requestMenu = function () {
  return {
    type: TYPES.MENU_REQUEST
  }
};

const receiveMenu = function (data) {
  return {
    type: TYPES.MENU_RECEIVE,
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.MENU_FETCHING_FAILED,
    payload: error
  }
};