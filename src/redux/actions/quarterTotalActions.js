import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchQuarterTotalStats = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestQuarterTotal(params.buildingName));

    //request request to backend to get the data
    ipcRenderer.send("get-quarter-total-stats", params);
    //listen when the data comes back
    return ipcRenderer.once("quarter-total-stats", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        console.log(arg);
        //success store the data
        dispatch(receiveQuarterTotal(arg.data));
      }
    });
  }
};

const requestQuarterTotal = function (page) {
  return {
    type: "REQUEST_QUARTER_TOTAL",
    page
  }
};

const receiveQuarterTotal = function (data) {
  return {
    type: "RECEIVE_QUARTER_TOTAL",
    data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "QUARTER_TOTAL_FETCHING_FAILED",
    payload: error
  }
};

const cleanupQuarterTotal = () => {
  return {
    type: "CLEANUP_QUARTER_TOTAL"
  }
}

export default {
  fetchQuarterTotalStats,
  fetchingFailed,
  receiveQuarterTotal,
  requestQuarterTotal,
  cleanupQuarterTotal
};