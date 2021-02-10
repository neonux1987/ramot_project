import { ipcSendReceive } from '../redux/actions/util/util';
import { ipcRenderer, remote } from 'electron';

export const saveToPdf = () => {

  const contents = remote.getCurrentWebContents();
  contents.printToPDF({});

  /* return ipcSendReceive({
    send: {
      channel: "save-to-pdf",
    },
    receive: {
      channel: "pdf-saved"
    },
    onSuccess: result => {
      console.log("*****************");
      console.log(result);
      console.log("*****************");
    }
  }); */

};