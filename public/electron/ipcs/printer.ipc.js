
const printerIpc = () => {
  const { ipcMain, BrowserWindow } = require('electron');

  const path = require('path');
  const fs = require('fs');
  const os = require('os');
  const SystemPaths = require("../../backend/system/SystemPaths");

  ipcMain.on('print-content', (event) => {
    // Create the browser window.
    const win = BrowserWindow.getFocusedWindow();

    win.webContents.printToPDF({
      marginsType: 0,
      pageSize: 'A4',
      printBackground: false,
      printSelectionOnly: false,
      silent: true,
      landscape: true
    }).then(data => {


      fs.writeFile(path.join(os.tmpdir(), "dada.pdf"), data, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('PDF Generated Successfully');
        }
      });
    })
      .catch(error => console.log(error));

    event.sender.send("content-printed", { data: "location of the pdf file" });
  });

}

module.exports = printerIpc;