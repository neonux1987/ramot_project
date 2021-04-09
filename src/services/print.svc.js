import { ipcRenderer } from 'electron';

export const print = async () => {

  ipcRenderer.send("print-pdf");

  return new Promise((resolve, reject) => {

    ipcRenderer.on("pdf-printed", (event, { data, pageCount, error }) => {
      if (error)
        reject(error);
      else {
        const blob = new Blob([data], { type: 'application/pdf' });
        resolve({
          blobUrl: URL.createObjectURL(blob),
          pageCount
        });
      }

    });

  });

};