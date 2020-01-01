import { ipcRenderer } from 'electron';

import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

/**
 * fetch general settings
 * @param {*} params 
 */
const fetchBackupsNames = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestSettings());

    //request request to backend to get the data
    ipcRenderer.send("get-backups-names");
    //listen when the data comes back
    ipcRenderer.once("backups-names-data", (event, arg) => {
      if (arg.error) {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(arg.error));
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        //sort the date
        const newDataArr = arg.data.sort((backup1, backup2) => {
          const date1 = new Date(backup1.backupDateTime);
          const date2 = new Date(backup2.backupDateTime);
          return date1.getTime() < date2.getTime() ? 1 : -1;
        });
        //success store the data
        dispatch(receiveSettings(newDataArr));
      }
    });
  }
};

const requestSettings = function () {
  return {
    type: "REQUEST_BACKUPS_NAMES"
  }
};

const receiveSettings = function (data) {
  return {
    type: "RECEIVE_BACKUPS_NAMES",
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: "BACKUPS_NAMES_FETCHING_FAILED",
    payload: error
  }
};


const initializeBackupNames = () => {
  return dispatch => {

    //request request to backend to get the data
    ipcRenderer.send("initialize-backups-names");
    //listen when the data comes back
    ipcRenderer.once("backups-names-initialized", (event, arg) => {
      if (arg.error) {
        //send the error to the notification center
        toast.error(arg.error, {
          onOpen: () => playSound(soundTypes.error)
        });
      } else {
        dispatch({
          type: "BACKUPS_NAMES_INIT"
        })
      }
    });
  }
}



export default {
  fetchBackupsNames,
  initializeBackupNames
};