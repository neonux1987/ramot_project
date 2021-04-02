
const printerIpc = () => {
  const { ipcMain, BrowserWindow } = require('electron');

  const path = require('path');
  const fs = require('fs');
  const SystemPaths = require("../../backend/system/SystemPaths");

  ipcMain.on('save-to-pdf-2', (event, { dataUrl, landscape = false }) => {
    // Create the browser window.
    const win = new BrowserWindow({
      title: "תצוגה לפני הדפסה",
      frame: false,
      show: true
    });

    win.loadURL(dataUrl);
    win.webContents.once("dom-ready", () => {

      win.webContents.printToPDF({
        marginsType: 0,
        pageSize: 'A4',
        printBackground: false,
        printSelectionOnly: false,
        silent: false,
        landscape
      }).then(data => {


        fs.writeFile(path.join(SystemPaths.paths.user_main_folder, "dada.pdf"), data, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('PDF Generated Successfully');
            win.close();
          }
        });
      })
        .catch(error => console.log(error));



    });

    event.sender.send("pdf-saved", { data: "location of the pdf file" });
  });

  ipcMain.on('save-to-pdf', (event, { dataUrl, landscape = false }) => {

    const { jsPDF } = require("jspdf");
    const doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4'
    });

    doc.html("dataUrl", {
      callback: function (doc) {
        doc.save(path.join(SystemPaths.paths.user_main_folder, "dada.pdf"));
      }
    },
      0,
      0
    );

    event.sender.send("pdf-saved", { data: "location of the pdf file" });
  });

}

module.exports = printerIpc;