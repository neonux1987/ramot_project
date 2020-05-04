import React from 'react';
import { ipcSendReceive } from "../redux/actions/util/util";
import { myToasts } from "../CustomToasts/myToasts";
import ToastRender from "../components/ToastRender/ToastRender";

export const dbIndependentBackup = (fullPath) => {
  return ipcSendReceive({
    send: {
      channel: "db-independent-backup",
      params: fullPath
    },
    receive: {
      channel: "db-independently-backed-up",
    },
    onError: (result) => {
      myToasts.error(result.error);
    }
  });
}

export const initiateDbBackup = () => {
  return ipcSendReceive({
    send: {
      channel: "initiate-db-backup"
    },
    receive: {
      channel: "db-backup-initiated",
    },
    onError: (result) => {
      myToasts.error(result.error);
    }
  });
}