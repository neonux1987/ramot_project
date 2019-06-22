import { remote } from 'electron';
import os from 'os';

let options = {

  defaultPath: undefined,

  //Placeholder 3
  filters: [
    { name: 'Excel', extensions: ['xlsx'] }
  ]
};

export default (defaultFileName = "", callback) => {

  const dialog = remote.dialog;
  const WIN = remote.getCurrentWindow();

  options.defaultPath = os.homedir() + "/" + defaultFileName;

  //asynchronous - using callback
  dialog.showSaveDialog(WIN, options, callback);

}