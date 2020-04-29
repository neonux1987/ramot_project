import { ipcSendReceive } from "./util/util";
import { myToasts } from "../../CustomToasts/myToasts";

export const dbIndependentBackup = (fullPath) => {
  return () => {

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
}