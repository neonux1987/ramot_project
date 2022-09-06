import React from "react";
import { ipcSendReceive } from "../redux/actions/util/util";
import { toastManager } from "../toasts/toastManager";
import ToastRender from "../components/ToastRender/ToastRender";
import { restartApp } from "./mainProcess.svc";
import { saveSettings, updateSettings } from "../redux/actions/settingsActions";

export const restore = ({ fileName, withConfig }, byList) => {
  const toastId = toastManager.info(
    <ToastRender
      spinner={true}
      message={"המערכת מבצעת שיחזור של הבסיס נתונים..."}
    />,
    {
      autoClose: false
    }
  );

  return ipcSendReceive({
    send: {
      channel: byList ? "restore-from-list" : "restore-from-file",
      params: {
        fileName,
        withConfig
      }
    },
    receive: {
      channel: byList ? "db-restored-from-list" : "db-restored-from-file"
    },
    onSuccess: () =>
      toastManager.update(toastId, {
        render: <ToastRender done={true} message={"השיחזור בוצע בהצלחה."} />,
        type: toastManager.types.SUCCESS,
        delay: 2000,
        autoClose: 500,
        onClose: () =>
          toastManager.info(
            "המערכת תבצע איתחול בשביל שהשינויים ייכנסו לתוקף.",
            {
              onClose: () => {
                restartApp();
              }
            }
          )
      }),
    onError: (result) =>
      toastManager.update(toastId, {
        render: result.error,
        type: toastManager.types.ERROR,
        delay: 2000,
        autoClose: 3000
      }),
    withErrorNotification: false
  });
};

export const resetDB = ({ withConfig }) => {
  const toastId = toastManager.info(
    <ToastRender
      spinner={true}
      message={"המערכת מבצעת איפוס בסיס נתונים והגדרות..."}
    />,
    {
      autoClose: false
    }
  );

  return ipcSendReceive({
    send: {
      channel: "reset-db",
      params: {
        withConfig
      }
    },
    receive: {
      channel: "db-resetted"
    },
    onSuccess: () => {
      toastManager.update(toastId, {
        render: <ToastRender done={true} message={"האיפוס בוצע בהצלחה"} />,
        type: toastManager.types.SUCCESS,
        delay: 2000,
        autoClose: 500,
        onClose: () =>
          toastManager.info(
            "המערכת תבצע איתחול בשביל שהשינויים ייכנסו לתוקף.",
            {
              onClose: () => {
                restartApp();
              }
            }
          )
      });
    },
    onError: (result) =>
      toastManager.update(toastId, {
        render: result.error,
        type: toastManager.types.ERROR,
        delay: 2000,
        autoClose: 3000
      }),
    withErrorNotification: false
  });
};

export const purgeCacheAfterRestore = (persistor) => {
  return async (dispatch, getState) => {
    const reduxSettings = getState().settings.data.redux;

    if (reduxSettings.purgeCache) {
      const payload = {
        purgeCache: false
      };
      dispatch(updateSettings("redux", payload));
      await dispatch(saveSettings(false));
      await persistor.purge();
      await persistor.persist();
      console.log("im here");
    }
  };
};
