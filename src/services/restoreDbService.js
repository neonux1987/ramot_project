import React from 'react';
import { ipcSendReceive } from "../redux/actions/util/util";
import { myToaster } from "../Toasts/toastManager";
import ToastRender from "../components/ToastRender/ToastRender";

export const restore = (payload, byList) => {
  const toastId = myToaster.info(<ToastRender spinner={true} message={"המערכת מבצעת שיחזור של הבסיס נתונים..."} />, {
    autoClose: false
  });

  return ipcSendReceive({
    send: {
      channel: byList ? "restore-from-list" : "restore-from-file",
      params: payload
    },
    receive: {
      channel: byList ? "db-restored-from-list" : "db-restored-from-file",
    },
    onSuccess: () => myToaster.update(toastId, {
      render: <ToastRender done={true} message={"השיחזור בוצע בהצלחה."} />,
      type: myToaster.TYPE.SUCCESS,
      delay: 2000,
      autoClose: 1500,
      onClose: () => {
        myToaster.info("המערכת מבצעת איתחול בשביל שהשינויים ייכנסו לתוקף.")
      }
    }),
    onError: (result) => myToaster.update(toastId, {
      render: result.error,
      type: myToaster.TYPE.ERROR,
      delay: 2000,
      autoClose: 3000
    }),
    withErrorNotification: false
  });
}