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
    dispatch(requestMonthStats(params.buildingName));

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
        dispatch(receiveMonthStats(arg.data));
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

const requestMonthStats = function (page) {
  return {
    type: "REQUEST_MONTH_STATS",
    page
  }
};

const receiveMonthStats = function (data) {
  return {
    type: "RECEIVE_MONTH_STATS",
    data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "MONTH_STATS_FETCHING_FAILED",
    payload: error
  }
};

const cleanupMonthStats = () => {
  return {
    type: "CLEANUP_MONTH_STATS"
  }
}

export default {
  fetchAllMonthsStatsByQuarter,
  fetchingFailed,
  receiveMonthStats,
  requestMonthStats,
  cleanupMonthStats,
  updateMonthStatsStoreOnly
};