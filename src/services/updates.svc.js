import { ipcSendReceive } from "../redux/actions/util/util";
import { myToaster } from "../Toasts/toastManager";
import { saveSettings, updateSettings } from "../redux/actions/settingsActions";

export const checkForUpdates = () => {
  return (dispatch, getState) => {
    return ipcSendReceive({
      send: {
        channel: "check-for-updates"
      },
      receive: {
        channel: "checked_update",
      },
      withErrorNotification: false,
      onSuccess: ({ data }) => {
        const appUpdatesSettings = getState().settings.data["appUpdates"];

        handleUpdate(dispatch, data, appUpdatesSettings).catch(({ message }) => {
          myToaster.error(message);
        });

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

}

const handleUpdate = async (dispatch, data, settings) => {
  if (data) {
    const { version, releaseDate } = data;

    if (version !== settings.updateVersion) {
      dispatch(updateSettings("appUpdates", { availableUpdate: true, updateVersion: version, releaseDate, updateDownloaded: false }));
    }

    const promise = await dispatch(saveSettings(false));

    if (promise === undefined)
      dispatch(updateSettings("appUpdates", { availableUpdate: false, updateVersion: "", releaseDate: "", updateDownloaded: false }));

  }
}