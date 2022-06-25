import { ipcRenderer } from "electron";
import { toastManager } from "../../toasts/toastManager";

// TYPES
export const TYPES = {
  SET_PRINT_MODE: "SET_PRINT_MODE",
  PRINT_REQUEST: "PRINT_REQUEST",
  PRINT_RECEIVE: "PRINT_RECEIVE",
  SET_COLORS: "SET_COLORS",
  SET_OUTPUT: "SET_OUTPUT",
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

export const setPrintReady = function async(printReady) {
  return (dispatch) => {
    dispatch({
      type: TYPES.SET_PRINT_READY,
      printReady
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

export const setOutput = function (output) {
  return (dispatch) => {
    dispatch({
      type: TYPES.SET_OUTPUT,
      output
    });
  };
};

export const printPreview = (options) => {
  return (dispatch, getState) => {
    const state = getState();
    const { printableComponentRef } = state.print;
    const blobUrl = createBlobFromHtml(printableComponentRef);

    ipcRenderer.send("print-pdf", options, blobUrl);

    ipcRenderer.once("pdf-printed", (event, { data, pageCount, error }) => {
      if (error) toastManager.error(error);
      else {
        const blob = new Blob([data], {
          type: "application/pdf;charset=utf-8"
        });
        dispatch(
          setOutput({
            pdfBuffer: data,
            blobUrl: URL.createObjectURL(blob),
            pageCount
          })
        );
      }
    });
  };
};

export const print = (options) => {
  return (_, getState) => {
    const state = getState();
    const { output } = state.print;

    if (output === null) {
      toastManager.error("תצוגת הדפסה עדיין לא מוכנה");
      return;
    }

    ipcRenderer.send("print", options, output);

    ipcRenderer.once("printed", (event, { error }) => {
      if (error) toastManager.error(error);
    });
  };
};

function createBlobFromHtml(componentRef) {
  let ownerDocument = componentRef.current.ownerDocument;
  const headElement = ownerDocument.head.cloneNode(true);
  const targetElement = componentRef.current.cloneNode(true);

  const doc = document.implementation.createDocument(
    "http://www.w3.org/1999/xhtml",
    "html",
    null
  );
  doc.documentElement.appendChild(headElement);
  const body = doc.createElementNS("http://www.w3.org/1999/xhtml", "body");
  doc.documentElement.appendChild(body);
  body.append(targetElement);

  let blob = new Blob([doc.documentElement.outerHTML], {
    type: "text/html;charset=utf-8"
  });
  return URL.createObjectURL(blob);
}
