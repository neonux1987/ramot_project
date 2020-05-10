import { ipcSendReceive } from '../redux/actions/util/util';

export const quitApp = () => {

  return ipcSendReceive({
    send: {
      channel: "quit-app",
    },
    receive: {
      channel: "app-terminated"
    }
  });

};

export const restartApp = () => {

  return ipcSendReceive({
    send: {
      channel: "restart-app",
    },
    receive: {
      channel: "app-restarted"
    }
  });

};