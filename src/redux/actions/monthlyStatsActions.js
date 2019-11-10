import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchAllMonthsStatsByQuarter = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestMonthlyStats());

    //request request to backend to get the data
    ipcRenderer.send("get-all-months-stats-by-quarter", params);
    //listen when the data comes back
    return ipcRenderer.once("all-months-stats-by-quarter", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveMonthlyStats(arg.data));
      }
    });
  }
};

const updateMonthStatsStoreOnly = (monthStatsObj, index) => {
  return dispatch => {
    dispatch({
      type: "UPDATE_MONTH_STATS_STORE_ONLY",
      monthStatsObj,
      index
    });
  }
}

const requestMonthlyStats = function (page) {
  return {
    type: "REQUEST_MONTHLY_STATS"
  }
};

const receiveMonthlyStats = function (data) {
  return {
    type: "RECEIVE_MONTHLY_STATS",
    data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "MONTHLY_STATS_FETCHING_FAILED",
    payload: error
  }
};

const cleanupMonthlyStats = () => {
  return {
    type: "CLEANUP_MONTHLY_STATS"
  }
}

export default {
  fetchAllMonthsStatsByQuarter,
  fetchingFailed,
  receiveMonthlyStats,
  requestMonthlyStats,
  cleanupMonthlyStats,
  updateMonthStatsStoreOnly
};