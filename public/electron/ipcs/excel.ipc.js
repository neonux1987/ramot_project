const { ipcMain } = require('electron');
const { exportExcel, exportExcelBulk } = require('../../backend/services/excel/excelSvc');

const excelIpc = () => {

  ipcMain.on('export-to-excel', (event, { buildingName, buildingNameEng, pageName, fileName, date, data }) => {
    exportExcel(buildingName, buildingNameEng, pageName, fileName, date, data).then((result) => {
      event.sender.send("excel-exported", { data: result });
    }).catch((error) => {
      event.reply("excel-exported", { error: error.message });
    });
  });

  ipcMain.on('export-to-excel-bulk', (event, { date, buildings }) => {
    exportExcelBulk(date, buildings).then((result) => {
      event.sender.send("excel-bulk-exported", { data: result });
    }).catch((error) => {
      event.reply("excel-bulk-exported", { error: error.message });
    });
  });

}

module.exports = excelIpc;