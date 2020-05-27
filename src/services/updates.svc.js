import { ipcSendReceive } from "../redux/actions/util/util";

export const checkForUpdates = () => {
  return (dispatch, getState) => {
    return ipcSendReceive({
      send: {
        channel: "check-for-updates"
      },
      receive: {
        channel: "checked_for_updates",
      }
    });
  }
}

export const downloadUpdate = () => {
  return dispatch => {
    return ipcSendReceive({
      send: {
        channel: "download-update"
      },
      receive: {
        channel: "downloading_update",
      }
    });
  }
}

export const abortDownload = (silent) => {
  return ipcSendReceive({
    send: {
      channel: "abort-download"
    },
    receive: {
      channel: "download_aborted",
    },
    withErrorNotification: silent
  });
}

export const installUpdate = () => {
  return ipcSendReceive({
    send: {
      channel: "install-update",
    },
    receive: {
      channel: "update_installed",
    }
  });
}

export const deleteUpdate = (filePath) => {
  return ipcSendReceive({
    send: {
      channel: "delete-update",
      params: filePath
    },
    receive: {
      channel: "update_deleted",
    }
  });
}