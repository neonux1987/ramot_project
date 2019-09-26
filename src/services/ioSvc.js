import { ipcRenderer } from 'electron';

export const ioSvc = (filePath) => {

  //request request to backend to get the data
  ipcRenderer.send("save-file", filePath);
  //listen when the data comes back
  ipcRenderer.once("file-saved", (event, arg) => {

    console.log(arg);

  });

}