import { ipcRenderer } from 'electron';
import { toastManager } from '../../../toasts/ToastManager';

export const ipcSendReceive = (details) => {
    const
        {
            send,
            receive,
            onSuccess,
            onError,
            withErrorNotification = true,
            withCatch = true
        } = details;
    const promise = new Promise((resolve, reject) => {
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
        if (withErrorNotification)
            toastManager.error(result.error);

        if (!withCatch)
            throw new Error(result.error);
    });

    return promise;
}