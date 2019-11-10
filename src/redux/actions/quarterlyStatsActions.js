import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchQuarterStats = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestQuarterlyStats());

    //request request to backend to get the data
    ipcRenderer.send("get-quarter-stats", params);
    //listen when the data comes back
    return ipcRenderer.once("quarter-stats", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveQuarterlyStats(arg.data));
      }
    });
  }
};

const fetchAllQuartersStatsByYear = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestQuarterlyStats());

    //request request to backend to get the data
    ipcRenderer.send("get-all-quarters-stats-by-year", params);
    //listen when the data comes back
    return ipcRenderer.once("all-quarters-stats-by-year", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveQuarterlyStats(arg.data));
      }
    });
  }
};

const requestQuarterlyStats = function (page) {
  return {
    type: "REQUEST_QUARTERLY_STATS",
    page
  }
};

const receiveQuarterlyStats = function (data) {
  return {
    type: "RECEIVE_QUARTERLY_STATS",
    data
  }
}

const updateQuarterStatsStoreOnly = (quarterStatsObj) => {
  return dispatch => {
    dispatch({
      type: "UPDATE_QUARTER_STATS_STORE_ONLY",
      quarterStatsObj
    });
  }
}

const fetchingFailed = function (error) {
  return {
    type: "QUARTERLY_STATS_FETCHING_FAILED",
    payload: error
  }
};

const cleanupQuarterlyStats = () => {
  return {
    type: "CLEANUP_QUARTERLY_STATS"
  }
}

export default {
  fetchQuarterStats,
  fetchAllQuartersStatsByYear,
  fetchingFailed,
  receiveQuarterlyStats,
  requestQuarterlyStats,
  cleanupQuarterlyStats,
  updateQuarterStatsStoreOnly
};