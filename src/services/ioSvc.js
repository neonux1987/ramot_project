import { ipcRenderer } from 'electron';
import { notify, notificationTypes } from '../components/Notifications/Notification';

export const ioSvc = (filePath) => {

  //request request to backend to get the data
  ipcRenderer.send("save-file", filePath);
  //listen when the data comes back
  return ipcRenderer.once("file-saved", (event, arg) => {
    if (arg.error) {
      //send the error to the notification center
      notify({
        isError: true,
        type: notificationTypes.db,
        message: arg.error
      });
    }
  });

}