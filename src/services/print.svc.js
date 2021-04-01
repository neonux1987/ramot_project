import { remote } from 'electron';
import { ipcSendReceive } from '../redux/actions/util/util';

export const saveToPdf = (dataUrl, width, height) => {

  /*   const contents = remote.getCurrentWebContents();
    contents.printToPDF({}); */

  return ipcSendReceive({
    send: {
      channel: "save-to-pdf",
      params: {
        dataUrl,
        width,
        height,
        landscape: true
      }
    },
    receive: {
      channel: "pdf-saved"
    }
  });
};