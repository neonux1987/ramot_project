import { ipcSendReceive } from "./util/util";

// TYPES
export const TYPES = {
  DEFAULT_EXPANSES_CODES_UPDATE: "DEFAULT_EXPANSES_CODES_UPDATE",
  DEFAULT_EXPANSES_CODES_REQUEST: "DEFAULT_EXPANSES_CODES_REQUEST",
  DEFAULT_EXPANSES_CODES_RECEIVE: "DEFAULT_EXPANSES_CODES_RECEIVE",
  DEFAULT_EXPANSES_CODES_FETCHING_FAILED:
    "DEFAULT_EXPANSES_CODES_FETCHING_FAILED",
  DEFAULT_EXPANSES_CODES_CLEANUP: "DEFAULT_EXPANSES_CODES_CLEANUP"
};

export const fetchDefaultExpansesCodes = () => {
  return (dispatch) => {
    //let react know that the fetching is started
    dispatch(requestDefaultExpansesCodes());

    return ipcSendReceive({
      send: {
        channel: "get-default-expanses-codes"
      },
      receive: {
        channel: "default-expanses-codes-data"
      },
      onSuccess: (result) => dispatch(receiveDefaultExpansesCodes(result.data)),
      onError: (result) => dispatch(fetchingFailed(result.error))
    });
  };
};

export const updateDefaultCodes = (payload) => {
  return (dispatch, getState) => {
    const oldDefaultExpanses = getState().defaultExpanses;
    //let react know that the fetching is started
    dispatch(updateInStore(payload));

    return ipcSendReceive({
      send: {
        channel: "batch-insert-default-expanses-codes",
        params: payload
      },
      receive: {
        channel: "batch-insert-default-expanses-codes-response"
      },
      onError: () => dispatch(updateInStore(oldDefaultExpanses))
    });
  };
};

const updateInStore = function (payload) {
  return {
    type: TYPES.DEFAULT_EXPANSES_CODES_UPDATE,
    payload
  };
};

const requestDefaultExpansesCodes = function () {
  return {
    type: TYPES.DEFAULT_EXPANSES_CODES_REQUEST
  };
};

const receiveDefaultExpansesCodes = function (data) {
  return {
    type: TYPES.DEFAULT_EXPANSES_CODES_RECEIVE,
    data: data
  };
};

const fetchingFailed = function (error) {
  return {
    type: TYPES.DEFAULT_EXPANSES_CODES_FETCHING_FAILED,
    payload: error
  };
};

export const defaultExpansesCodesCleanup = () => {
  return {
    type: TYPES.DEFAULT_EXPANSES_CODES_CLEANUP
  };
};
