import { myToaster } from "../Toasts/toastManager";

const { ipcRenderer } = require('electron');

export const initUpdateListeners = () => {

  ipcRenderer.on('update_available', (event, version) => {
    ipcRenderer.removeAllListeners('update_available');
    myToaster.AppUpdateNewVersion(version);

  });

  ipcRenderer.on('update_downloaded', (event, version) => {
    ipcRenderer.removeAllListeners('update_downloaded');
    myToaster.AppUpdateInstall(version);
  });

}