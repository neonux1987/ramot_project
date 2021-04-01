
const printerIpc = () => {
  const { ipcMain, BrowserWindow } = require('electron');

  const path = require('path');
  const fs = require('fs');
  const SystemPaths = require("../../backend/system/SystemPaths");

  ipcMain.on('save-to-pdf', (event, { dataUrl, landscape = false }) => {
    // Create the browser window.
    const win = new BrowserWindow({
      title: "תצוגה לפני הדפסה",
      frame: false,
      show: true
    });

    win.loadURL(dataUrl);
    win.once("dom-ready", () => {
      console.log("data");
      win.webContents.printToPDF({
        marginsType: 0,
        pageSize: 'A4',
        printBackground: false,
        printSelectionOnly: false,
        silent: false,
        landscape
      }).then(data => {


        fs.writeFile(path.join(SystemPaths.paths.user_main_folder, "test.pdf"), data, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('PDF Generated Successfully');
          }
        });
      })
        .catch(error => console.log(error));

    });

    event.sender.send("pdf-saved", { data: "location of the pdf file" });
  });

}

module.exports = printerIpc;