import { remote } from 'electron';
import { ipcSendReceive } from '../redux/actions/util/util';

export const saveToPdf = () => {

  /*   const contents = remote.getCurrentWebContents();
    contents.printToPDF({}); */

  return ipcSendReceive({
    send: {
      channel: "save-to-pdf",
    },
    receive: {
      channel: "pdf-saved"
    }
  });
};