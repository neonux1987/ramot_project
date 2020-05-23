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
      withError: false,
      onSuccess: async ({ data }) => {
        const { availableUpdate, updateVersion } = getState().settings.data.appUpdates;

        if (data) {
          const { version, releaseDate } = data;

          // dont override settings if it's the same version
          if (availableUpdate === false && data.version !== updateVersion) {
            dispatch(updateSettings("appUpdates", { availableUpdate: true, updateVersion: version, releaseDate }));

            const promise = await dispatch(saveSettings(false));

            if (promise === undefined)
              dispatch(updateSettings("appUpdates", { availableUpdate: false, updateVersion: "" }));
          }
        }

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

export const installUpdate = () => {

}