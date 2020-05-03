import { ipcSendReceive } from '../redux/actions/util/util';
import { myToasts } from '../CustomToasts/myToasts';

export const quitApp = () => {

  return ipcSendReceive({
    send: {
      channel: "quit-app",
    },
    receive: {
      channel: "app-terminated"
    },
    onError: (result) => myToasts.error(result.error)
  });

};

export const restartApp = () => {

  return ipcSendReceive({
    send: {
      channel: "restart-app",
    },
    receive: {
      channel: "app-restarted"
    },
    onError: (result) => myToasts.error(result.error)
  });

};