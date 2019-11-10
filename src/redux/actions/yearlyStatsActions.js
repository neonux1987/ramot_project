import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * fetch month expanses
 * @param {*} params 
 */
const fetchYearStats = (params = Object) => {
  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestYearlyStats());

    //request request to backend to get the data
    ipcRenderer.send("get-year-stats", params);
    //listen when the data comes back
    return ipcRenderer.once("year-stats", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveYearlyStats(arg.data));
      }
    });
  }
};

const requestYearlyStats = function (page) {
  return {
    type: "REQUEST_YEARLY_STATS"
  }
};

const receiveYearlyStats = function (data) {
  return {
    type: "RECEIVE_YEARLY_STATS",
    data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "YEARLY_STATS_FETCHING_FAILED",
    payload: error
  }
};

const cleanupYearlyStats = () => {
  return {
    type: "CLEANUP_YEARLY_STATS"
  }
}

export default {
  fetchYearStats,
  fetchingFailed,
  receiveYearlyStats,
  requestYearlyStats,
  cleanupYearlyStats
};