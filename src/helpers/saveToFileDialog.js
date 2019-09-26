import { remote } from 'electron';
import os from 'os';

export default (defaultFileName = "", options, callback) => {

  const dialog = remote.dialog;
  const WIN = remote.getCurrentWindow();

  if (options.defaultPath) {
    options.defaultPath = options.defaultPath + "/" + defaultFileName;
  } else {
    options.defaultPath = os.homedir() + "/" + defaultFileName;
  }
  console.log(options);
  //asynchronous - using callback
  dialog.showSaveDialog(WIN, options, callback);

}