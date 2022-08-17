import { ipcRenderer } from "electron";
import os from "os";

export const saveToFileDialog = async (defaultFileName = "", options = {}) => {
  if (options.defaultPath) {
    options.defaultPath = options.defaultPath + "\\" + defaultFileName;
  } else {
    options.defaultPath = os.homedir() + "\\Desktop\\" + defaultFileName;
  }

  return await ipcRenderer.invoke("show-save-dialog", options);
};

export const selectFileDialog = () => {
  return selectFolderDialog({ properties: ["openFile"] });
};

export const selectFolderDialog = async (options = {}) => {
  const copiedOptions = {
    properties: ["openDirectory"],
    defaultPath: options.defaultPath
      ? options.defaultPath
      : os.homedir() + "\\Desktop\\",
    ...options
  };

  return await ipcRenderer.invoke("show-folder-selector-dialog", copiedOptions);
};
