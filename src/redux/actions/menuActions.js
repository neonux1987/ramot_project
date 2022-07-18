import { ipcRenderer } from "electron";
import { toastManager } from "../../toasts/toastManager";

export const TYPES = {
  MENU_REQUEST: "MENU_REQUEST",
  MENU_RECEIVE: "MENU_RECEIVE",
  MENU_FETCHING_FAILED: "MENU_FETCHING_FAILED"
};

export const fetchMenu = () => {
  return async (dispatch) => {
    //let react know that the fetching is started
    dispatch(requestMenu());

    const { data, error } = await ipcRenderer.invoke(
      "get-buildings-by-status",
      {
        status: "פעיל"
      }
    );

    if (data) dispatch(receiveMenu(data));
    else {
      dispatch(fetchingFailed(error));
      toastManager.error(error);
    }
  };
};

const requestMenu = function () {
  return {
    type: TYPES.MENU_REQUEST
  };
};

const receiveMenu = function (data) {
  return {
    type: TYPES.MENU_RECEIVE,
    data: data
  };
};

const fetchingFailed = function (error) {
  return {
    type: TYPES.MENU_FETCHING_FAILED,
    payload: error
  };
};
