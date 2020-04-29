import { ipcRenderer } from 'electron';

import { playSound, soundTypes } from '../../audioPlayer/audioPlayer';
import { toast } from 'react-toastify';
import { ipcSendReceive } from './util/util';
import { myToasts } from '../../CustomToasts/myToasts';

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

    return ipcSendReceive({
      send: {
        channel: "get-backups-names",
      },
      receive: {
        channel: "backups-names-data",
      },
      onSuccess: (result) => {
        //sort the date
        const newDataArr = result.data.sort((backup1, backup2) => {
          const date1 = new Date(backup1.backupDateTime);
          const date2 = new Date(backup2.backupDateTime);
          return date1.getTime() < date2.getTime() ? 1 : -1;
        });
        //success store the data
        dispatch(receiveBackupsNames(newDataArr));
      },
      onError: (result) => {
        //let react know that an erro occured while trying to fetch
        dispatch(fetchingFailed(result.error));
        //send the error to the notification center
        myToasts.error(result.error);
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

    return ipcSendReceive({
      send: {
        channel: "initialize-backups-names",
      },
      receive: {
        channel: "backups-names-initialized",
      },
      onSuccess: () => {
        dispatch({
          type: TYPES.BACKUPS_NAMES_INIT
        })
      }
    });

  }
}
