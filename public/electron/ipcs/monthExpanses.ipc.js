const { ipcMain } = require('electron');
const MonthExpansesLogic = require('../../backend/logic/MonthExpansesLogic');

const monthExpansesIpc = (connection) => {

  //fetch month expanses data
  const monthExpansesLogic = new MonthExpansesLogic(connection);

  ipcMain.on('get-month-expanses-data', (event, arg) => {
    monthExpansesLogic.getAllMonthExpanses(arg).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("month-expanses-data", { data: result });
    }).catch((error) => {
      event.reply("month-expanses-data", { error: error.message });
    });
  });

  ipcMain.on('update-month-expanse', (event, data) => {
    monthExpansesLogic.updateMonthExpanse(data).then((result) => {
      event.reply("month-expanse-updated", result);
    }).catch((err) => {
      console.log(err)
    });
  });

  ipcMain.on('add-new-month-expanse', (event, data) => {
    monthExpansesLogic.addNewMonthExpanse(data).then((result) => {
      event.reply("month-expanse-added", result);
    }).catch((err) => {
      console.log(err)
    });

  });

}

module.exports = monthExpansesIpc;