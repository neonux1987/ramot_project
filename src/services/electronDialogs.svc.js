import { ipcRenderer } from "electron";
import os from "os";

export const saveToFileDialog = async (defaultFileName = "", options = {}) => {
  const dialog = await ipcRenderer.invoke("get-dialog");
  const WIN = await ipcRenderer.invoke("get-focused-window");

  if (options.defaultPath) {
    options.defaultPath = options.defaultPath + "/" + defaultFileName;
  } else {
    options.defaultPath = os.homedir() + "/" + defaultFileName;
  }

  //asynchronous - returns a promise
  return dialog.showSaveDialog(WIN, options);
};

export const selectFileDialog = () => {
  return selectFolderDialog({ properties: ["openFile"] });
};

export const selectFolderDialog = async (options = {}) => {
  const dialog = await ipcRenderer.invoke("get-dialog");
  const WIN = await ipcRenderer.invoke("get-focused-window");

  const copiedOptions = {
    properties: ["openDirectory"],
    defaultPath: options.defaultPath ? options.defaultPath : os.homedir(),
    ...options
  };

  //asynchronous - using callback
  return dialog.showOpenDialog(WIN, copiedOptions);
};
