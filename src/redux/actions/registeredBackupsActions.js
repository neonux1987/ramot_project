import { ipcSendReceive } from './util/util';
import { myToasts } from '../../CustomToasts/myToasts';

export const TYPES = {
  REGISTERED_BACKUPS_REQUEST: "REGISTERED_BACKUPS_REQUEST",
  REGISTERED_BACKUPS_RECEIVE: "REGISTERED_BACKUPS_RECEIVE",
  REGISTERED_BACKUPS_FETCHING_FAILED: "REGISTERED_BACKUPS_FETCHING_FAILED",
  REGISTERED_BACKUPS_INIT: "REGISTERED_BACKUPS_INIT"
}

export const fetchRegisteredBackups = () => {

  return dispatch => {

    //let react know that the fetching is started
    dispatch(requestRegisteredBackups());

    return ipcSendReceive({
      send: {
        channel: "get-registered-backups",
      },
      receive: {
        channel: "registered-backups-data",
      },
      onSuccess: (result) => {
        //sort the date
        const newDataArr = result.data.sort((backup1, backup2) => {
          const date1 = new Date(backup1.backupDateTime);
          const date2 = new Date(backup2.backupDateTime);
          return date1.getTime() < date2.getTime() ? 1 : -1;
        });
        //success store the data
        dispatch(receiveRegisteredBackups(newDataArr));
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

const requestRegisteredBackups = function () {
  return {
    type: TYPES.REGISTERED_BACKUPS_REQUEST
  }
};

const receiveRegisteredBackups = function (data) {
  return {
    type: TYPES.REGISTERED_BACKUPS_RECEIVE,
    data: data
  }
}

const fetchingFailed = function (error) {
  return {
    type: TYPES.REGISTERED_BACKUPS_FETCHING_FAILED,
    payload: error
  }
};


export const initializeRegisteredBackups = () => {
  return dispatch => {

    return ipcSendReceive({
      send: {
        channel: "initialize-registered-backups",
      },
      receive: {
        channel: "registered-backups-initialized",
      },
      onSuccess: () => {
        dispatch({
          type: TYPES.REGISTERED_BACKUPS_INIT
        })
      }
    });

  }
}