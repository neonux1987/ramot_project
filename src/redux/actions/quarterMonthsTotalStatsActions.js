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
    dispatch(requestQuarterMonthsTotalStats(params.buildingName));

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
        dispatch(receiveQuarterMonthsTotalStats(arg.data, params.buildingName));
      }
    });
  }
};

const requestQuarterMonthsTotalStats = function (page) {
  return {
    type: "REQUEST_QUARTER_MONTHS_TOTAL",
    page
  }
};

const receiveQuarterMonthsTotalStats = function (data, page) {
  return {
    type: "RECEIVE_QUARTER_MONTHS_TOTAL",
    data,
    page
  }
}

const fetchingFailed = function (error) {
  return {
    type: "QUARTER_MONTHS_TOTAL_FETCHING_FAILED",
    payload: error
  }
};

const cleanupQuarterMonthsTotal = () => {
  return {
    type: "CLEANUP_QUARTER_MONTHS_TOTAL"
  }
}

export default {
  fetchQuarterMonthsTotalStats,
  fetchingFailed,
  receiveQuarterMonthsTotalStats,
  requestQuarterMonthsTotalStats,
  cleanupQuarterMonthsTotal
};