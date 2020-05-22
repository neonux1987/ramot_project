import { ipcRenderer } from "electron";
import { ipcSendReceive } from "../redux/actions/util/util";
import { saveSettings, updateSettings } from "../redux/actions/settingsActions";

export const checkForUpdates = () => {
  return (dispatch, getState) => {
    return ipcSendReceive({
      send: {
        channel: "check-for-updates"
      },
      receive: {
        channel: "update_available",
      },
      onSuccess: async ({ data }) => {
        const { availableUpdate, updateVersion } = getState().settings.data.appUpdates;

        // dont override settings if it's the same version
        if (availableUpdate === false && data.version !== updateVersion) {
          dispatch(updateSettings("appUpdates", { availableUpdate: true, updateVersion: data.version }));

          const promise = await dispatch(saveSettings(false));

          if (promise === undefined)
            dispatch(updateSettings("appUpdates", { availableUpdate: false, updateVersion: "" }));
        }

      }
    });
  }
}

export const downloadUpdate = () => {
  ipcRenderer.send("download-update");

  ipcRenderer.on("download_progress", (event, progress) => {
    let percent = Number.parseInt(progress.percent);
    console.log(progress);

    if (percent === 100)
      ipcRenderer.removeAllListeners("download_progress")

  })
}

export const installUpdate = () => {

}