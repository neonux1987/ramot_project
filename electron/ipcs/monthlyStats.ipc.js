const { ipcMain } = require('electron');
const MonthlyStatsLogic = require('../backend/logic/MonthlyStatsLogic');

const monthlyStatsIpc = (connection) => {

  const monthlyStatsLogic = new MonthlyStatsLogic(connection);

  ipcMain.on('get-all-months-stats-by-quarter', (event, arg) => {
    monthlyStatsLogic.getAllMonthsStatsByQuarterTrx(arg).then((result) => {
      event.sender.send("all-months-stats-by-quarter", { data: result });
    }).catch((error) => {
      event.reply("all-months-stats-by-quarter", { error: error.message });
    });
  });

  ipcMain.on('get-all-months-stats-by-year', (event, { buildingNameEng, year }) => {
    monthlyStatsLogic.getAllMonthsStatsByYear(buildingNameEng, year).then((result) => {
      event.sender.send("all-months-stats-by-year", { data: result });
    }).catch((error) => {
      event.reply("all-months-stats-by-year", { error: error.message });
    });
  });


}

module.exports = monthlyStatsIpc;