import { ipcRenderer } from 'electron';
import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * toggle sidebar
 * @param {*} payload 
 */
const toggleSidebar = (payload) => ({
  type: "TOGGLE_SIDEBAR",
  payload
});

/**
 * fetch general settings
 * @param {*} params 
 */
const fetchSidebar = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSidebar());

    //request request to backend to get the data
    ipcRenderer.send("get-menu");
    //listen when the data comes back
    ipcRenderer.once("menu-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //success store the data
        dispatch(receiveSidebar(arg.data));
      }
    });
  }
};

const requestSidebar = function () {
  return {
    type: "REQUEST_SIDEBAR"
  }
};

const receiveSidebar = function (data) {
  return {
    type: "RECEIVE_SIDEBAR",
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "FETCHING_FAILED",
    payload: error
  }
};

export default {
  fetchSidebar,
  fetchingFailed,
  receiveSidebar,
  requestSidebar,
  toggleSidebar
};