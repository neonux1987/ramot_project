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

export const batchInsertDefaultCodes = (
  allDefaultExpansesUpdated,
  checkedOnlyDefaultExpanses
) => {
  return (dispatch, getState) => {
    // keep a backup of default expanses
    const oldDefaultExpanses = getState().defaultExpanses;

    // update store state with new default expanses
    dispatch(updateInStore(allDefaultExpansesUpdated));

    return ipcSendReceive({
      send: {
        channel: "batch-insert-default-expanses-codes",
        params: checkedOnlyDefaultExpanses
      },
      receive: {
        channel: "batch-insert-default-expanses-codes-response"
      },
      onError: () => dispatch(updateInStore(oldDefaultExpanses)) // rollback to the backed up default expanses
    });
  };
};

export const batchDeleteDefaultCodes = (
  allDefaultExpansesUpdated,
  checkedOnlyDefaultExpanses
) => {
  return (dispatch, getState) => {
    const oldDefaultExpanses = getState().defaultExpanses;
    //let react know that the fetching is started
    dispatch(updateInStore(allDefaultExpansesUpdated));

    return ipcSendReceive({
      send: {
        channel: "batch-delete-default-expanses-codes",
        params: checkedOnlyDefaultExpanses
      },
      receive: {
        channel: "batch-delete-default-expanses-codes-response"
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
