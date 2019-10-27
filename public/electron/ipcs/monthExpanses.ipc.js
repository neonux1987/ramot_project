const { ipcMain } = require('electron');
const MonthExpansesLogic = require('../../backend/logic/MonthExpansesLogic');

const monthExpansesIpc = (connection) => {

  //fetch month expanses data
  const monthExpansesLogic = new MonthExpansesLogic(connection);

  ipcMain.on('get-month-expanses-data', (event, arg) => {
    monthExpansesLogic.getAllMonthExpansesTrx(arg.buildingName, arg.date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("month-expanses-data", { data: result });
    }).catch((error) => {
      event.reply("month-expanses-data", { error: error.message });
    });
  });

  ipcMain.on('update-month-expanse', (event, data) => {
    monthExpansesLogic.updateMonthExpanse(data).then((result) => {
      event.reply("month-expanse-updated", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("month-expanse-updated", { error: error.message });
    });
  });

  ipcMain.on('add-new-month-expanse', (event, data) => {
    monthExpansesLogic.addNewMonthExpanse(data).then((result) => {
      event.reply("month-expanse-added", result);
    }).catch((err) => {
      console.log(err)
    });

  });

  ipcMain.on('delete-month-expanse', (event, data) => {
    monthExpansesLogic.deleteMonthExpanse(data).then((result) => {
      event.reply("month-expanse-deleted", { data: result });
    }).catch((error) => {
      event.reply("month-expanse-deleted", { error: error.message });
    });
  });

  ipcMain.on('generate-empty-month-expanses-report', (event, arg) => {
    monthExpansesLogic.createEmptyReport(arg.buildingName, arg.date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("generated-empty-month-expanses-data", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("generated-empty-month-expanses-data", { error: error.message });
    });
  });

}

module.exports = monthExpansesIpc;