const printerIpc = () => {
  const { ipcMain, BrowserWindow, app, dialog } = require("electron");

  ipcMain.on("print-pdf", async (event, pageSetup = {}) => {
    // Create the browser window.
    const win = BrowserWindow.getAllWindows()[0];

    const options = {
      marginsType: 0,
      pageSize: "A4",
      printBackground: true,
      printSelectionOnly: false,
      silent: true,
      landscape: true,
      scaleFactor: 100,
      ...pageSetup,
    };

    const data = await win.webContents.printToPDF(options);

    const { PDFDocument } = require("pdf-lib");
    const doc = await PDFDocument.load(data);
    const pages = doc.getPages();

    if (data === undefined || data === null)
      event.sender.send("pdf-printed", {
        error: `המערכת לא הצליחה לקרוא את קובץ ה-pdf לתצוגת הדפסה`,
      });
    else {
      // add page numbers
      for (let i = 0; i < pages.length; i++) {
        pages[i].drawText(`${i + 1}/${pages.length}`, {
          x: 10,
          y: 10,
          size: 14,
        });
      }

      event.sender.send("pdf-printed", {
        data: await doc.save(),
        pageCount: pages.length,
      });
    }
  });

  ipcMain.on("print", async (event, pageSetup = {}, pdfInfo) => {
    const fse = require("fs-extra");
    const path = require("path");
    const SystemPaths = require("../backend/system/SystemPaths");
    const { print } = require("pdf-to-printer");

    const tempFilePath = path.join(
      SystemPaths.paths.app_temp_folder,
      "tmp-pdf-print.pdf"
    );

    const options = {
      printer: pageSetup.deviceName,
      silent: true,
      paperSize: pageSetup.pageSize,
      copies: pageSetup.copies,
    };

    // write the pdf data to a file
    await fse.outputFile(tempFilePath, pdfInfo.pdfBuffer);

    // the module we are using pdt-to-print uses
    // sumatraPDF behind the curtains which in case
    // of printing to a pdf it generates images of
    // the pages and creates big size pdf files and
    // uneditable. so instead in case that the selected printer
    // is a pdf printer, we just copy the already generated temp
    // file to the user chosen destination and acheieve
    // editable and small size pdf and it's a lot faster
    if (options.printer.toUpperCase().includes("PDF")) {
      const { canceled, filePath } = await dialog.showSaveDialog(null, {
        title: "שמירת קובץ PDF",
      });
      if (!canceled) {
        await fse.copy(tempFilePath, filePath);
        await fse.remove(tempFilePath);
      }

      return;
    }

    // print
    await print(tempFilePath, options);

    // after print job is done, remove the
    // temp print file
    await fse.remove(tempFilePath);
  });

  ipcMain.on("get-printers", async (event, pageSetup) => {
    // Create the browser window.
    const win = BrowserWindow.getAllWindows()[0];
    const printers = win.webContents.getPrinters();

    const list = [];
    printers.forEach(({ name, isDefault }) => {
      list.push({
        deviceName: name,
        isDefault,
      });
    });
    event.sender.send("printers-list", { data: list });
  });
};

module.exports = printerIpc;
