const { ipcMain } = require('electron');
const MonthTotalLogic = require('../../backend/logic/MonthTotalLogic');

const monthTotalIpc = (connection) => {

  const monthTotalLogic = new MonthTotalLogic(connection);

  ipcMain.on('get-quarter-months-total-stats', (event, arg) => {
    monthTotalLogic.getAllMonthsTotalByQuarterTrx(arg).then((result) => {
      event.sender.send("quarter-months-total-stats", { data: result });
    }).catch((error) => {
      event.reply("quarter-months-total-stats", { error: error.message });
    });
  });

}

module.exports = monthTotalIpc;