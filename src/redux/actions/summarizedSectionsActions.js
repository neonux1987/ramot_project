import { toastManager } from '../../toasts/toastManager';
import { ipcSendReceive } from './util/util';
import { showSavedNotification } from './savedNotificationActions';

// TYPES
export const TYPES = {
  SUMMARIZED_SECTIONS_REQUEST: "SUMMARIZED_SECTIONS_REQUEST",
  SUMMARIZED_SECTIONS_RECEIVE: "SUMMARIZED_SECTIONS_RECEIVE",
  SUMMARIZED_SECTIONS_FETCHING_FAILED: "SUMMARIZED_SECTIONS_FETCHING_FAILED",
  SUMMARIZED_SECTIONS_UPDATE: "SUMMARIZED_SECTIONS_UPDATE",
  SUMMARIZED_SECTIONS_ADD: "SUMMARIZED_SECTIONS_ADD",
  SUMMARIZED_SECTIONS_DELETE: "SUMMARIZED_SECTIONS_DELETE",
  SUMMARIZED_SECTIONS_RESTORE: "SUMMARIZED_SECTIONS_RESTORE",
  SUMMARIZED_SECTIONS_INIT_STATE: "SUMMARIZED_SECTIONS_INIT_STATE",
  SUMMARIZED_SECTIONS_CLEANUP: "SUMMARIZED_SECTIONS_CLEANUP"
}

export const fetchSummarizedSections = (status) => {
  return dispatch => {

    //let react know that the fetching started
    dispatch(requestSummarizedSections());

    return ipcSendReceive({
      send: {
        channel: "get-summarized-sections-data",
        params: status
      },
      receive: {
        channel: "summarized-sections-data"
      },
      onSuccess: result => dispatch(receiveSummarizedSections(result.data)),
      onError: result => dispatch(fetchingFailed(result.error))
    });

  }
};

const requestSummarizedSections = function () {
  return {
    type: TYPES.SUMMARIZED_SECTIONS_REQUEST
  }
};

const receiveSummarizedSections = function (data) {
  return {
    type: TYPES.SUMMARIZED_SECTIONS_RECEIVE,
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.SUMMARIZED_SECTIONS_FETCHING_FAILED,
    payload: error
  }
};

export const addSummarizedSection = (params = Object) => {
  return dispatch => {

    return ipcSendReceive({
      send: {
        channel: "add-summarized-section",
        params
      },
      receive: {
        channel: "summarized-section-added"
      },
      onSuccess: (result) => {
        // add the returned id to the new summarized
        // section object and save it in the store
        params.summarizedSection.id = result.data;
        dispatch(addSummarizedSectionStoreOnly(params.summarizedSection));

        //send success notification
        toastManager.success("הסעיף נוסף בהצלחה.");
      },
      onError: result => toastManager.error(result.error)
    });

  }
};

const addSummarizedSectionStoreOnly = (summarizedSection) => {
  return {
    type: TYPES.SUMMARIZED_SECTIONS_ADD,
    payload: summarizedSection
  }
}

const updateSummarizedSectionStoreOnly = (summarizedSection, index) => {
  return {
    type: TYPES.SUMMARIZED_SECTIONS_UPDATE,
    payload: summarizedSection,
    index
  }
}

export const updateSummarizedSection = (newCopy, oldCopy, index) => {
  return dispatch => {
    dispatch(updateSummarizedSectionStoreOnly(newCopy, index));

    const params = {
      id: newCopy.id,
      summarizedSection: {
        section: newCopy.section
      }
    };

    return ipcSendReceive({
      send: {
        channel: "update-summarized-section",
        params
      },
      receive: {
        channel: "summarized-section-updated"
      },
      onSuccess: () => dispatch(showSavedNotification()),
      onError: () => dispatch(updateSummarizedSectionStoreOnly(oldCopy, index)) // rollback

    });

  }
};

export const deleteSummarizedSection = (oldCopy, index) => {
  return dispatch => {
    dispatch(deleteSummarizedSectionStoreOnly(index));

    return ipcSendReceive({
      send: {
        channel: "delete-summarized-section",
        params: { id: oldCopy.id }
      },
      receive: {
        channel: "summarized-section-deleted"
      },
      onSuccess: () => toastManager.success("הסעיף נמחק בהצלחה."),
      onError: () => dispatch(addSummarizedSectionStoreOnly(oldCopy)) // rollback

    });

  }
};

export const deleteSummarizedSectionStoreOnly = (index) => {
  return {
    type: TYPES.SUMMARIZED_SECTIONS_DELETE,
    index
  }
}

export const summarizedSectionsCleanup = () => {
  return {
    type: TYPES.SUMMARIZED_SECTIONS_CLEANUP
  }
}