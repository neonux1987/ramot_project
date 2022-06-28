import { ipcSendReceive } from "../redux/actions/util/util";
import { ipcRenderer } from "electron";
const remote = require("@electron/remote");

export const quitApp = () => {
  return ipcSendReceive({
    send: {
      channel: "quit-app"
    },
    receive: {
      channel: "app-terminated"
    }
  });
};

export const restartApp = () => {
  return ipcSendReceive({
    send: {
      channel: "restart-app"
    },
    receive: {
      channel: "app-restarted"
    }
  });
};

export const muteSound = (muted) => {
  remote.getCurrentWebContents().setAudioMuted(muted);
  remote.getCurrentWebContents().reload();
};

export const refreshView = () => {
  remote.getCurrentWebContents().reload();
};

export const showItemInFolder = (path) => {
  ipcRenderer.send("show-item-in-folder", path);
};

export const openItem = (path, ensure) => {
  ipcRenderer.send("open-item", path, ensure);
};
