import React from 'react';
import { ipcSendReceive } from "../redux/actions/util/util";
import { myToasts } from "../CustomToasts/myToasts";
import ToastRender from "../components/ToastRender/ToastRender";

export const restore = (payload, byList) => {
  const toastId = myToasts.info(<ToastRender spinner={true} message={"המערכת מבצעת שיחזור של הבסיס נתונים..."} />, {
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
    onSuccess: () => myToasts.update(toastId, {
      render: <ToastRender done={true} message={"השיחזור בוצע בהצלחה."} />,
      type: myToasts.TYPE.SUCCESS,
      delay: 2000,
      autoClose: 1500,
      onClose: () => {
        myToasts.info("המערכת מבצעת איתחול בשביל שהשינויים ייכנסו לתוקף.")
      }
    }),
    onError: (result) => myToasts.update(toastId, {
      render: result.error,
      type: myToasts.TYPE.ERROR,
      delay: 2000,
      autoClose: 3000
    }),
    withError: false
  });
}