const { ipcMain } = require('electron');
const { exportExcel } = require('../../backend/services/excel/excelSvc');

const excelIpc = (connection) => {

  ipcMain.on('export-to-excel', (event, pageName, excelData) => {
    exportExcel(pageName, excelData).then((result) => {
      event.sender.send("excel-exported", { data: result });
    }).catch((error) => {
      event.reply("excel-exported", { error: error.message });
    });
  });

}

module.exports = excelIpc;