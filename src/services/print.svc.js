import { ipcRenderer } from "electron";

export const generatePreview = async (options) => {
  ipcRenderer.send("print-pdf", options);

  return new Promise((resolve, reject) => {
    ipcRenderer.on("pdf-printed", (event, { data, pageCount, error }) => {
      if (error) reject(error);
      else {
        const blob = new Blob([data], { type: "application/pdf" });
        resolve({
          pdfBuffer: data,
          blobUrl: URL.createObjectURL(blob),
          pageCount,
        });
      }
    });
  });
};

export const print = async (options, pdfInfo) => {
  ipcRenderer.send("print", options, pdfInfo);

  return new Promise((resolve, reject) => {
    ipcRenderer.on("printed", (event, { error }) => {
      if (error) reject(error);
    });
  });
};
