const { ipcMain, webContents } = require('electron');


const printerIpc = () => {

  ipcMain.on('save-to-pdf', (event, content) => {
    const contents = webContents.getFocusedWebContents();
    contents.printToPDF({});
    event.sender.send("pdf-saved", { data: "location of the pdf file" });
  });

}

module.exports = printerIpc;