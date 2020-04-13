import { ipcRenderer } from 'electron';

import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';

export const TYPES = {
  BACKUPS_NAMES_REQUEST: "BACKUPS_NAMES_REQUEST",
  BACKUPS_NAMES_RECEIVE: "BACKUPS_NAMES_RECEIVE",
  BACKUPS_NAMES_FETCHING_FAILED: "BACKUPS_NAMES_FETCHING_FAILED",
  BACKUPS_NAMES_INIT: "BACKUPS_NAMES_INIT",
  BACKUPS_NAMES_REQUEST: "BACKUPS_NAMES_REQUEST"
}

/**
 * fetch general settings
 * @param {*} params 
 */
export const fetchBackupsNames = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestBackupsNames());

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
        dispatch(receiveBackupsNames(newDataArr));
      }
    });
  }
};

const requestBackupsNames = function () {
  return {
    type: TYPES.BACKUPS_NAMES_REQUEST
  }
};

const receiveBackupsNames = function (data) {
  return {
    type: TYPES.BACKUPS_NAMES_RECEIVE,
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.BACKUPS_NAMES_FETCHING_FAILED,
    payload: error
  }
};


export const initializeBackupNames = () => {
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
          type: TYPES.BACKUPS_NAMES_INIT
        })
      }
    });
  }
}
