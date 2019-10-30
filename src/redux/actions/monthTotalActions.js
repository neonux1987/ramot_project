import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchQuarterMonthsTotalStats = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestMonthTotal(params.buildingName));

    //request request to backend to get the data
    ipcRenderer.send("get-quarter-months-total-stats", params);
    //listen when the data comes back
    return ipcRenderer.once("quarter-months-total-stats", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveMonthTotal(arg.data));
      }
    });
  }
};

const requestMonthTotal = function (page) {
  return {
    type: "REQUEST_MONTH_TOTAL",
    page
  }
};

const receiveMonthTotal = function (data) {
  return {
    type: "RECEIVE_MONTH_TOTAL",
    data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "MONTH_TOTAL_FETCHING_FAILED",
    payload: error
  }
};

const cleanupMonthTotal = () => {
  return {
    type: "CLEANUP_MONTH_TOTAL"
  }
}

export default {
  fetchQuarterMonthsTotalStats,
  fetchingFailed,
  receiveMonthTotal,
  requestMonthTotal,
  cleanupMonthTotal
};