import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * fetch summarized sections
 * @param {*} payload 
 */
const fetchSummarizedSections = (params = Object) => {
  return dispatch => {

    //let react know that the fetching started
    dispatch(requestSummarizedSections());

    //request request to backend to get the data
    ipcRenderer.send("get-summarized-sections-data", params);
    //listen when the data comes back
    ipcRenderer.once("summarized-sections-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveSummarizedSections(arg.data));
      }
    });

  }
};

const requestSummarizedSections = function () {
  return {
    type: "REQUEST_SUMMARIZED_SECTIONS"
  }
};

const receiveSummarizedSections = function (data) {
  return {
    type: "RECEIVE_SUMMARIZED_SECTIONS",
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "FETCHING_FAILED",
    payload: error
  }
};

/**
 * add budget execution
 * @param {*} params 
 * @param {*} tableData 
 */
const addSummarizedSection = (params = Object) => {
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
        //success store the data
        dispatch(receiveSummarizedSections(arg.data));
      }
    });
  }
};

/**
 * update budget execution
 * @param {*} payload 
 * @param {*} tableData 
 */
const updateSummarizedSection = (params = Object, tableData = Array) => {
  return dispatch => {
    /* //send a request to backend to get the data
    ipcRenderer.send("update-budget-execution", params);
    //listen when the data comes back
    ipcRenderer.once("month-expanse-updated", (event, arg) => {
      if (arg.error) {
        console.log(arg.error);
      } else {
        
      }
    }); */

    dispatch(receiveSummarizedSections(tableData));
  }
};

const summarizedSectionsCleanup = () => {
  return {
    type: "SUMMARIZED_SECTIONS_CLEANUP"
  }
}

export default {
  fetchSummarizedSections,
  addSummarizedSection,
  updateSummarizedSection,
  fetchingFailed,
  receiveSummarizedSections,
  requestSummarizedSections,
  summarizedSectionsCleanup
};