
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

  ipcMain.on('save-to-pdf', (event, { element }) => {
    console.log("element");
    const path = require('path');
    const fs = require('fs');
    const os = require('os');

    const { jsPDF } = require('jspdf');

    const doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: "a4"
    });

    doc.setFont("sans-serif");

    doc.html(element, {
      callback: function (doc) {
        doc.autoPrint({ variant: 'non-conform' });

        const outputPath = path.join(os.tmpdir(), "print.pdf");

        /* fs.writeFile(outputPath, doc.output(), function (err) {
          if (err) {
            console.log(err);
          } else {
            //openItem(outputPath);
            console.log('PDF Generated Successfully');
          }
        }); */


        //doc.save("test");
      },
      x: 0,
      y: 0,
      fontFaces: [{
        family: "sans-serif"
      }],
      html2canvas: {
        scale: 0.245
      }
    });

    event.sender.send("pdf-saved", { data: "location of the pdf file" });
  });

}

module.exports = printerIpc;