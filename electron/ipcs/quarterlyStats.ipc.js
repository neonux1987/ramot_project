const { ipcMain } = require('electron');
const QuarterlyStatsLogic = require('../backend/logic/QuarterlyStatsLogic');

const quarterlyStatsIpc = (connection) => {

  const quarterlyStatsLogic = new QuarterlyStatsLogic(connection);

  ipcMain.on('get-quarter-stats', (event, arg) => {
    quarterlyStatsLogic.getQuarterStatsTrx(arg).then((result) => {
      event.sender.send("quarter-stats", { data: result });
    }).catch((error) => {
      event.reply("quarter-stats", { error: error.message });
    });
  });

  ipcMain.on('get-all-quarters-stats-by-year', (event, arg) => {
    quarterlyStatsLogic.getAllQuartersStatsByYearTrx(arg).then((result) => {
      event.sender.send("all-quarters-stats-by-year", { data: result });
    }).catch((error) => {
      event.reply("all-quarters-stats-by-year", { error: error.message });
    });
  });

}

module.exports = quarterlyStatsIpc;