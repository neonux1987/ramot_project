import { ipcRenderer } from 'electron';
import { notify, notificationTypes } from '../components/Notifications/Notification';
import { playSound, soundTypes } from '../audioPlayer/audioPlayer';

export const activateDbBackup = () => {

  /* //send a request to backend to get the data
  ipcRenderer.send("save-settings");
  //listen when the data comes back
  ipcRenderer.once("saved-settings", (event, arg) => {
    if (arg.error) {
      console.log(arg.error);
    } else {
      //send the error to the notification center
      notify({
        type: notificationTypes.message,
        message: "ההגדרות נשמרו בהצלחה."
      });
      playSound(soundTypes.message);
    }
  }); */

  return new Promise((resolve,reject)=>{
    resolve();
  })

}

export const disableDbBackup = () => {
  /* //send a request to backend to get the data
  ipcRenderer.send("save-settings");
  //listen when the data comes back
  ipcRenderer.once("saved-settings", (event, arg) => {
    if (arg.error) {
      console.log(arg.error);
    } else {
      //send the error to the notification center
      notify({
        type: notificationTypes.message,
        message: "ההגדרות נשמרו בהצלחה."
      });
      playSound(soundTypes.message);
    }
  }); */

  return new Promise((resolve,reject)=>{
    resolve();
  })

}

export const updateDbBackupSettings = () => {

  //send a request to backend to get the data
  ipcRenderer.send("update-db-backup-settings");
  //listen when the data comes back
  ipcRenderer.once("db-backup-settings-updated", (event, arg) => {
    if (arg.error) {
      console.log(arg.error);
    } else {
      //send the error to the notification center
      console.log(arg);
    }
  });

}