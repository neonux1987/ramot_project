import React from 'react';
import { ipcSendReceive } from "../redux/actions/util/util";
import { toastManager } from "../toasts/ToastManager";
import ToastRender from "../components/ToastRender/ToastRender";
import { restartApp } from './mainProcess.svc';

export const restore = (payload, byList) => {
  const toastId = toastManager.info(<ToastRender spinner={true} message={"המערכת מבצעת שיחזור של הבסיס נתונים..."} />, {
    autoClose: false,
    onChange: (event) => {
      console.log(event);
    }
  });

  return ipcSendReceive({
    send: {
      channel: byList ? "restore-from-list" : "restore-from-file",
      params: payload
    },
    receive: {
      channel: byList ? "db-restored-from-list" : "db-restored-from-file",
    },
    onSuccess: () => toastManager.update(toastId, {
      render: <ToastRender done={true} message={"השיחזור בוצע בהצלחה."} />,
      type: toastManager.types.SUCCESS,
      delay: 2000,
      autoClose: 500,
      onChange: () => console.log("what change"),
      onClose: () => toastManager.info("המערכת תבצע איתחול בשביל שהשינויים ייכנסו לתוקף.", {
        onClose: () => {
          console.log("hello");
          //restartApp();
        }
      })
    }),
    onError: (result) => toastManager.update(toastId, {
      render: result.error,
      type: toastManager.types.ERROR,
      delay: 2000,
      autoClose: 3000,
      onChange: () => console.log("what change")
    }),
    withErrorNotification: false
  });
}