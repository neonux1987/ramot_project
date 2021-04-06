import { ipcRenderer } from 'electron';

export const print = async () => {

  ipcRenderer.send("print-pdf");

  return new Promise((resolve, reject) => {

    ipcRenderer.on("pdf-printed", (event, result) => {
      if (result.error)
        reject(result.error);
      else {
        const blob = new Blob([result.data], { type: 'application/pdf' });
        resolve({
          blobUrl: URL.createObjectURL(blob)
        });
      }

    });

  });

};