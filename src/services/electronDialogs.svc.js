import { remote } from 'electron';
import os from 'os';

export const saveToFileDialog = (defaultFileName = "", options = {}) => {

  const dialog = remote.dialog;
  const WIN = remote.getCurrentWindow();

  if (options.defaultPath) {
    options.defaultPath = options.defaultPath + "/" + defaultFileName;
  } else {
    options.defaultPath = os.homedir() + "/" + defaultFileName;
  }

  //asynchronous - returns a promise
  return dialog.showSaveDialog(WIN, options);

}

export const selectFileDialog = () => {
  return selectFolderDialog({ properties: ['openFile'] });
}

export const selectFolderDialog = (options = {}) => {
  const dialog = remote.dialog;
  const WIN = remote.getCurrentWindow();

  const copiedOptions = {
    properties: ['openDirectory'],
    defaultPath: options.defaultPath ? options.defaultPath : os.homedir(),
    ...options,
  }

  //asynchronous - using callback
  return dialog.showOpenDialog(WIN, copiedOptions);

}