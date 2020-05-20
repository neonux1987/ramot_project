import { ipcRenderer } from 'electron';
import { myToaster } from '../../../Toasts/toastManager';

export const ipcSendReceive = (details) => {
  const
    {
      send,
      receive,
      onSuccess,
      onError,
      withError = true
    } = details;
  return new Promise((resolve, reject) => {
    //request request to backend to get the data
    ipcRenderer.send(send.channel, send.params);
    //listen when the data comes back
    ipcRenderer.once(receive.channel, (event, arg) => {
      if (arg.error) {
        onError && onError(arg);
        reject({
          success: false,
          error: arg.error
        });
      }
      else {
        onSuccess && onSuccess(arg);
        resolve({
          success: true,
          data: arg.data
        });
      }

    });
  }).catch(result => {
    if (withError)
      myToaster.error(result.error);
  });
}

/* export const ipcSendReceive = (sendChannel, sendArgs, receiveChannel, successCallback, errorCallback) => {
  return new Promise((resolve, reject) => {
    //request request to backend to get the data
    ipcRenderer.send(sendChannel, sendArgs);
    //listen when the data comes back
    ipcRenderer.once(receiveChannel, (event, arg) => {
      if (arg.error) {
        errorCallback && errorCallback(arg);
        reject({
          success: false,
          error: arg.error
        });
      }
      else {
        successCallback && successCallback(arg);
        resolve({
          success: true,
          data: arg.data
        });
      }

    });
  });
} */