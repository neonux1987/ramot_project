const { ipcMain } = require('electron');
const MonthExpansesLogic = require('../../backend/logic/MonthExpansesLogic');

const monthExpansesIpc = (connection) => {

  //fetch month expanses data
  const monthExpansesLogic = new MonthExpansesLogic(connection);

  ipcMain.on('get-month-expanses', (event, { buildingNameEng, date }) => {
    monthExpansesLogic.getAllMonthExpansesTrx(buildingNameEng, date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("month-expanses-data", { data: result });
    }).catch((error) => {
      event.reply("month-expanses-data", { error: error.message });
    });
  });

  ipcMain.on('get-data-row-count', (event, { buildingNameEng, date }) => {
    monthExpansesLogic.dataRowCount(buildingNameEng, date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("data-row-count", { data: result });
    }).catch((error) => {
      event.reply("data-row-count", { error: error.message });
    });
  });

  ipcMain.on('update-month-expanse', (event, params) => {
    monthExpansesLogic.updateMonthExpanse(params).then((result) => {
      event.reply("month-expanse-updated", { data: result });
    }).catch((error) => {
      event.reply("month-expanse-updated", { error: error.message });
    });
  });

  ipcMain.on('add-new-month-expanse', (event, params) => {
    monthExpansesLogic.addNewMonthExpanse(params).then((result) => {
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

  ipcMain.on('generate-empty-month-expanses-report', (event, { buildingNameEng, date }) => {
    monthExpansesLogic.createEmptyReport(buildingNameEng, date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("generated-empty-month-expanses-data", { data: result });
    }).catch((error) => {
      event.reply("generated-empty-month-expanses-data", { error: error.message });
    });
  });

}

module.exports = monthExpansesIpc;