import { ipcSendReceive } from "../redux/actions/util/util";
import { ipcRenderer } from "electron";

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

export const refreshView = async () => {
  const webContents = await ipcRenderer.invoke(
    "get-focused-window-webContents"
  );
  webContents.reload();
};

export const showItemInFolder = (path) => {
  ipcRenderer.send("show-item-in-folder", path);
};

export const openItem = (path, ensure) => {
  ipcRenderer.send("open-item", path, ensure);
};

export const getAppInfo = async () => {
  return await ipcRenderer.invoke("get-app-info");
};

export const minimizeWindow = async () => {
  return await ipcRenderer.invoke("minimize-window");
};

export const maximizeWindow = async () => {
  return await ipcRenderer.invoke("maximize-window");
};

export const getSettings = (callback) => {
  ipcRenderer.removeAllListeners("settings-data");
  ipcRenderer.send("get-settings");
  ipcRenderer.once("settings-data", (_, result) => {
    callback(result);
  });
};

export const getAllBuildings = (callback) => {
  ipcRenderer.removeAllListeners("all-buildings-data");
  ipcRenderer.send("get-all-buildings");
  ipcRenderer.once("all-buildings-data", (_, result) => {
    callback(result);
  });
};
