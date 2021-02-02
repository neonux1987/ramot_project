import { ipcSendReceive } from '../redux/actions/util/util';
import { ipcRenderer, remote } from 'electron';

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

export const muteSound = (muted) => {
  remote.getCurrentWebContents().setAudioMuted(muted)
};

export const showItemInFolder = (path) => {
  ipcRenderer.send('show-item-in-folder', path);
};

export const openItem = (path) => {
  ipcRenderer.send('open-item', path);
};