import { ipcRenderer } from "electron";
import ConfirmBackupsRestore from "../../components/modals/ConfirmBackupsRestore/ConfirmBackupsRestore";
import { toastManager } from "../../toasts/toastManager";
import { show } from "./modalActions";
import { ipcSendReceive } from "./util/util";

export const TYPES = {
  REGISTERED_BACKUPS_REQUEST: "REGISTERED_BACKUPS_REQUEST",
  REGISTERED_BACKUPS_RECEIVE: "REGISTERED_BACKUPS_RECEIVE",
  REGISTERED_BACKUPS_FETCHING_FAILED: "REGISTERED_BACKUPS_FETCHING_FAILED",
  REGISTERED_BACKUPS_INIT: "REGISTERED_BACKUPS_INIT"
};

export const fetchRegisteredBackups = () => {
  return (dispatch) => {
    //let react know that the fetching is started
    dispatch(requestRegisteredBackups());

    return ipcSendReceive({
      send: {
        channel: "get-registered-backups"
      },
      receive: {
        channel: "registered-backups-data"
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
      onError: (result) => dispatch(fetchingFailed(result.error))
    });
  };
};

const requestRegisteredBackups = function () {
  return {
    type: TYPES.REGISTERED_BACKUPS_REQUEST
  };
};

const receiveRegisteredBackups = function (data) {
  return {
    type: TYPES.REGISTERED_BACKUPS_RECEIVE,
    data: data
  };
};

const fetchingFailed = function (error) {
  return {
    type: TYPES.REGISTERED_BACKUPS_FETCHING_FAILED,
    payload: error
  };
};

export const checkForBackupsInFolder = () => {
  return async (dispatch) => {
    const { data, error } = await ipcRenderer.invoke(
      "check-for-backups-in-folder"
    );

    if (error) {
      toastManager.error("המערכת לא הצליחה לבצע סריקה של גיבויים ישנים");
      return;
    }

    if (data.length > 0) {
      const props = {
        onAgreeHandler: async () => {
          //await registerOldBackups();
          console.log("hello");
        },
        data
      };
      console.log("yes");
      dispatch(show(ConfirmBackupsRestore, props));
    } else {
      console.log("im in else");
      //dispatch(initializeRegisteredBackups());
    }
  };
};

export const registerOldBackups = async () => {
  const { error } = await ipcRenderer.invoke("scan-for-backups-and-register");

  if (error) {
    toastManager.error("המערכת לא הצליחה לבצע רישום של הגיבויים");
    return;
  }

  toastManager.success("רישום הגיבויים בוצע בהצלחה");
};

export const initializeRegisteredBackups = () => {
  return (dispatch) => {
    return ipcSendReceive({
      send: {
        channel: "initialize-registered-backups"
      },
      receive: {
        channel: "registered-backups-initialized"
      },
      onSuccess: () => {
        dispatch({
          type: TYPES.REGISTERED_BACKUPS_INIT
        });
      }
    });
  };
};
