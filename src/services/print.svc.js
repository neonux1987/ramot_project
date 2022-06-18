import { ipcRenderer } from "electron";

export const printPreview = async (options, blobUrl) => {
  ipcRenderer.send("print-pdf", options, blobUrl);

  return new Promise((resolve, reject) => {
    ipcRenderer.on("pdf-printed", (event, { data, pageCount, error }) => {
      if (error) reject(error);
      else {
        const blob = new Blob([data], {
          type: "application/pdf;charset=utf-8"
        });
        resolve({
          pdfBuffer: data,
          blobUrl: URL.createObjectURL(blob),
          pageCount
        });
      }
    });
  });
};

export const print = async (options, pdfInfo) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send("print", options, pdfInfo);

    ipcRenderer.on("printed", (event, { error }) => {
      if (error) reject(error);
    });
  });
};
