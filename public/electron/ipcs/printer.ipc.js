const { RecordVoiceOver } = require('@material-ui/icons');

const printerIpc = () => {
  const { ipcMain, BrowserWindow } = require('electron');

  ipcMain.on('print-pdf', (event, pageSetup) => {
    /* const {
      orientation,
      size,
      margin
    } = pageSetup; */

    // Create the browser window.
    const win = BrowserWindow.getAllWindows()[0];

    win.webContents.printToPDF({
      marginsType: 0,
      pageSize: 'A4',
      printBackground: true,
      printSelectionOnly: false,
      silent: true,
      landscape: true,
      /* headerFooter: [{
        title: "asdasdas",
        url: "http://localhost:3000"
      }] */

    }).then(data => {
      event.sender.send("pdf-printed", { data });
    }).catch(error => {
      event.sender.send("pdf-printed", { error: error.message })
    });

  });

}

module.exports = printerIpc;