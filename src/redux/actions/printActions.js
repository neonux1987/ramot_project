import { ipcRenderer } from "electron";

// TYPES
export const TYPES = {
  SET_PRINT_MODE: "SET_PRINT_MODE",
  PRINT_REQUEST: "PRINT_REQUEST",
  PRINT_RECEIVE: "PRINT_RECEIVE",
  SET_COLORS: "SET_COLORS"
}

export const setPrintMode = function async(printMode) {
  return dispatch => {
    dispatch({
      type: TYPES.SET_PRINT_MODE,
      printMode
    });
  }
}

export const setColors = function async(colors) {
  return dispatch => {
    dispatch({
      type: TYPES.SET_COLORS,
      colors
    });
  }
}

export const getPrinters = () => {

  return dispatch => {
    dispatch(requestPrinters());

    ipcRenderer.send("get-printers");

    ipcRenderer.on("printers-list", (event, { data }) => {
      dispatch(receivePrinters(data));
    });
  }

};

const requestPrinters = function () {
  return {
    type: TYPES.PRINT_REQUEST
  }
};

const receivePrinters = function (data) {
  return {
    type: TYPES.PRINT_RECEIVE,
    data
  }
}