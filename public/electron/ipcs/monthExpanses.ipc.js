const { ipcMain } = require('electron');
const MonthExpansesLogic = require('../../backend/logic/MonthExpansesLogic');

const monthExpansesIpc = (connection) => {

  //fetch month expanses data
  const monthExpansesLogic = new MonthExpansesLogic(connection);

  ipcMain.on('get-month-expanses-data-by-range', (event, arg) => {
    monthExpansesLogic.getMonthExpansesByRange(arg.buildingName, arg.date, arg.range).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("month-expanses-data-by-range", { data: result });
    }).catch((error) => {
      event.reply("month-expanses-data-by-range", { error: error.message });
    });
  });

  ipcMain.on('get-data-row-count', (event, arg) => {
    monthExpansesLogic.dataRowCount(arg.buildingName, arg.date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("data-row-count", { data: result });
    }).catch((error) => {
      event.reply("data-row-count", { error: error.message });
    });
  });

  ipcMain.on('update-month-expanse', (event, data) => {
    monthExpansesLogic.updateMonthExpanse(data).then((result) => {
      event.reply("month-expanse-updated", { data: result });
    }).catch((error) => {
      event.reply("month-expanse-updated", { error: error.message });
    });
  });

  ipcMain.on('add-new-month-expanse', (event, data) => {
    monthExpansesLogic.addNewMonthExpanse(data).then((result) => {
      event.reply("month-expanse-added", { data: result });
    }).catch((error) => {

      event.reply("month-expanse-added", { error: error.message });
    });

  });

  ipcMain.on('delete-month-expanse', (event, params) => {
    monthExpansesLogic.deleteMonthExpanseTrx(params).then((result) => {
      event.reply("month-expanse-deleted", { data: result });
    }).catch((error) => {
      event.reply("month-expanse-deleted", { error: error.message });
    });
  });

  ipcMain.on('delete-month-expanses-by-summarized-section-id', (event, params) => {
    monthExpansesLogic.deleteMonthExpansesBySummarizedSectionId(params).then((result) => {
      event.reply("month-expanses-by-summarized-section-id-deleted", { data: result });
    }).catch((error) => {
      event.reply("month-expanses-by-summarized-section-id-deleted", { error: error.message });
    });
  });

  ipcMain.on('generate-empty-month-expanses-report', (event, arg) => {
    monthExpansesLogic.createEmptyReport(arg.buildingName, arg.date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("generated-empty-month-expanses-data", { data: result });
    }).catch((error) => {
      event.reply("generated-empty-month-expanses-data", { error: error.message });
    });
  });

}

module.exports = monthExpansesIpc;