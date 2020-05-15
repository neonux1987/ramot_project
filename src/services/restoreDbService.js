import { ipcSendReceive } from "../redux/actions/util/util";

export const restoreFromFile = () => {
  return ipcSendReceive({
    send: {
      channel: "restore-from-file"
    },
    receive: {
      channel: "db-restored-from-file",
    }
  });
}