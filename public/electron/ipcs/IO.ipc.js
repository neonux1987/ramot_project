const { ipcMain, BrowserWindow } = require('electron');


const IOIpc = () => {

  let workerWindow;
  ipcMain.on('print', (event, content) => {
    workerWindow = new BrowserWindow();
    workerWindow.loadURL("file://" + __dirname + "/../printWorkerHtml/printWorker.html");
    // workerWindow.hide();
    workerWindow.webContents.openDevTools();
    workerWindow.on("closed", () => {
      workerWindow = undefined;
    });
    console.log(content);
    workerWindow.webContents.on("did-finish-load", () => {
      workerWindow.webContents.send("worker-data", content);
    });
  });

  //console.log(contents);
  ipcMain.on('print-worker-data', (event, content) => {
    workerWindow.print({ silent: false, printBackground: false, deviceName: '' }, (error, data) => {
      console.log("asdasdas");


      if (error) throw error;
      else console.log(data);


    })


  });

}

module.exports = IOIpc;