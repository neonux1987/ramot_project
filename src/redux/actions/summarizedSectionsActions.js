import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

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

    return new Promise((resolve, reject) => {
      //let react know that the fetching started
      dispatch(requestSummarizedSections());

      //request request to backend to get the data
      ipcRenderer.send("get-summarized-sections-data", status);
      //listen when the data comes back
      ipcRenderer.once("summarized-sections-data", (event, arg) => {
        if (arg.error) {
          //let react know that an erro occured while trying to fetch
          dispatch(fetchingFailed(arg.error));
          //send the error to the notification center
          toast.error(arg.error, {
            onOpen: () => playSound(soundTypes.error)
          });
          reject("שליפת סעיפים מסכמים מהבסיס הנתונים נכשלה.")
        } else {
          //success store the data
          dispatch(receiveSummarizedSections(arg.data));
          resolve(arg.data);
        }
      });
    })

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
    //send a request to backend to get the data
    ipcRenderer.send("add-summarized-section", params);
    //listen when the data comes back
    ipcRenderer.once("summarized-section-added", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        // add the returned id to the new summarized
        // section object and save it in the store
        params.summarizedSection.id = arg.data;
        dispatch(addSummarizedSectionStoreOnly(params.summarizedSection));

        //send success notification
        toast.success("הסעיף עודכן בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
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
    }

    //send a request to backend to get the data
    ipcRenderer.send("update-summarized-section", params);
    //listen when the data comes back
    ipcRenderer.once("summarized-section-updated", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
        // rollback
        dispatch(updateSummarizedSectionStoreOnly(oldCopy, index));
      } else {
        //send success notification
        toast.success("הסעיף עודכן בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
    });

  }
};

export const deleteSummarizedSection = (oldCopy, index) => {
  return dispatch => {
    dispatch(deleteSummarizedSectionStoreOnly(index));

    //send a request to backend to get the data
    ipcRenderer.send("delete-summarized-section", { id: oldCopy.id });
    //listen when the data comes back
    ipcRenderer.once("summarized-section-deleted", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
        // rollback
        dispatch(addSummarizedSectionStoreOnly(oldCopy));
      } else {
        //send success notification
        toast.success("הסעיף נמחק בהצלחה.", {
          onOpen: () => playSound(soundTypes.message)
        });
      }
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