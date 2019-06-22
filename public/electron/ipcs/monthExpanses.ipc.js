const { ipcMain } = require('electron');
const MonthExpansesLogic = require('../../backend/logic/MonthExpansesLogic');

const monthExpansesIpc = (connection) => {

  //fetch month expanses data
  const monthExpansesLogic = new MonthExpansesLogic(connection);

  ipcMain.on('get-month-expanses-data', (event, arg) => {
    monthExpansesLogic.getAllMonthExpanses(arg).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("month-expanses-data", result);
    }).catch((err) => {
      throw "קרתה תקלה בשליפת המידע מהבסיס נתונים.";
    });
  });

  ipcMain.on('update-month-expanse', (event, data) => {
    let result = monthExpansesLogic.updateMonthExpanse(data);
    event.sender.send("month-expanse-updated", result);
  });

  ipcMain.on('add-new-month-expanse', (event, data) => {
    let result = monthExpansesLogic.addNewMonthExpanse(data);
    event.sender.send("month-expanse-added", result);
  });

}

module.exports = monthExpansesIpc;