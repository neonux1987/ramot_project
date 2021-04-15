const printerIpc = () => {
  const { ipcMain, BrowserWindow } = require('electron');

  ipcMain.on('print-pdf', async (event, pageSetup = {}) => {

    // Create the browser window.
    const win = BrowserWindow.getAllWindows()[0];

    const options = {
      marginsType: 0,
      pageSize: 'A4',
      printBackground: true,
      printSelectionOnly: false,
      silent: true,
      landscape: true,
      ...pageSetup
    };

    const data = await win.webContents.printToPDF(options);

    const { PDFDocument } = require('pdf-lib');
    const doc = await PDFDocument.load(data);
    const pages = doc.getPages();

    if (data === undefined || data === null)
      event.sender.send("pdf-printed", { error: `המערכת לא הצליחה לקרוא את קובץ ה-pdf לתצוגת הדפסה` })
    else {
      // add page numbers
      for (let i = 0; i < pages.length; i++) {
        pages[i].drawText(`${i + 1}/${pages.length}`, {
          x: 10,
          y: 10,
          size: 14
        })
      }

      event.sender.send("pdf-printed", {
        data: await doc.save(),
        pageCount: pages.length
      });
    }

  });

  ipcMain.on('print', async (event, pageSetup = {}) => {

    // Create the browser window.
    const win = BrowserWindow.getAllWindows()[0];

    const options = {
      marginsType: 0,
      pageSize: 'A4',
      printBackground: true,
      silent: true,
      ...pageSetup
    };
    console.log(options);
    win.webContents.print(options);

  });

  ipcMain.on('get-printers', async (event, pageSetup) => {
    // Create the browser window.
    const win = BrowserWindow.getAllWindows()[0];
    const printers = win.webContents.getPrinters();

    const list = [];
    printers.forEach(({ name, isDefault }) => {
      list.push({
        deviceName: name,
        isDefault
      })
    })
    event.sender.send("printers-list", { data: list })

  });

}

module.exports = printerIpc;