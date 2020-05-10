import { ipcSendReceive } from "../redux/actions/util/util";
import { myToasts } from "../CustomToasts/myToasts";

export const dbIndependentBackup = (fullPath) => {
  return ipcSendReceive({
    send: {
      channel: "db-independent-backup",
      params: fullPath
    },
    receive: {
      channel: "db-independently-backed-up",
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
    }
  });
}