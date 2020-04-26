import { ipcRenderer } from 'electron';

export const ipcSendReceive = (sendChannel, sendArgs, receiveChannel, successCallback, errorCallback) => {
  return new Promise((resolve, reject) => {
    //request request to backend to get the data
    ipcRenderer.send(sendChannel, sendArgs);
    //listen when the data comes back
    ipcRenderer.once(receiveChannel, (event, arg) => {
      if (arg.error) {
        errorCallback && errorCallback();
        reject({
          success: false,
          error: arg.error
        });
      }
      else {
        successCallback && successCallback();
        resolve({
          success: true,
          data: arg.data
        });
      }

    });
  });
}