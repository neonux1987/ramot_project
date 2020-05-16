import { ipcSendReceive } from "../redux/actions/util/util";

export const restoreFromFile = path => {
  return ipcSendReceive({
    send: {
      channel: "restore-from-file",
      params: path
    },
    receive: {
      channel: "db-restored-from-file",
    }
  });
}