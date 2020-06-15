import { toastManager } from "../toasts/ToastManager";

const { ipcRenderer } = require('electron');

export const initUpdateListeners = () => {

  ipcRenderer.on('update_available', (event, version) => {
    ipcRenderer.removeAllListeners('update_available');
    toastManager.AppUpdateNewVersion(version);

  });

  ipcRenderer.on('update_downloaded', (event, version) => {
    ipcRenderer.removeAllListeners('update_downloaded');
    toastManager.AppUpdateInstall(version);
  });

}