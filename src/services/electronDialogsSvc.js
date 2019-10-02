import { remote } from 'electron';
import os from 'os';

export const saveToFileDialog = (defaultFileName = "", options, callback) => {

  const dialog = remote.dialog;
  const WIN = remote.getCurrentWindow();

  if (options.defaultPath) {
    options.defaultPath = options.defaultPath + "/" + defaultFileName;
  } else {
    options.defaultPath = os.homedir() + "/" + defaultFileName;
  }

  //asynchronous - using callback
  dialog.showSaveDialog(WIN, options, callback);

}

export const selectFolderDialog = (options = {}, callback) => {

  const dialog = remote.dialog;
  const WIN = remote.getCurrentWindow();

  const copiedOptions = {
    ...options,
    properties: ['openDirectory'],
    defaultPath: options.defaultPath ? options.defaultPath : os.homedir()
  }

  //asynchronous - using callback
  dialog.showOpenDialog(WIN, copiedOptions, callback);

}