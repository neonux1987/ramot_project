import { ipcRenderer } from "electron";

// TYPES
export const TYPES = {
  SET_PRINT_MODE: "SET_PRINT_MODE",
  PRINT_REQUEST: "PRINT_REQUEST",
  PRINT_RECEIVE: "PRINT_RECEIVE",
  SET_COLORS: "SET_COLORS",
  SET_PRINTABLE_COMPONENT_REF: "SET_PRINTABLE_COMPONENT_REF"
};

export const setPrintMode = function async(printMode) {
  return (dispatch) => {
    dispatch({
      type: TYPES.SET_PRINT_MODE,
      printMode
    });
  };
};

export const setPrintableComponentRef = function async(printableComponentRef) {
  return (dispatch) => {
    dispatch({
      type: TYPES.SET_PRINTABLE_COMPONENT_REF,
      printableComponentRef
    });
  };
};

export const setColors = function async(colors) {
  return (dispatch) => {
    dispatch({
      type: TYPES.SET_COLORS,
      colors
    });
  };
};

export const getPrinters = () => {
  return (dispatch) => {
    ipcRenderer.send("get-printers");

    return new Promise((resolve) => {
      dispatch(requestPrinters());

      ipcRenderer.on("printers-list", (event, { data }) => {
        dispatch(receivePrinters(data));
        resolve(data);
      });
    });
  };
};

const requestPrinters = function () {
  return {
    type: TYPES.PRINT_REQUEST
  };
};

const receivePrinters = function (data) {
  return {
    type: TYPES.PRINT_RECEIVE,
    data
  };
};
