const { ipcMain } = require('electron');
const YearlyStatsLogic = require('../../backend/logic/YearlyStatsLogic');

const yearlyStatsIpc = (connection) => {

  const yearlyStatsLogic = new YearlyStatsLogic(connection);

  ipcMain.on('get-year-stats', (event, arg) => {
    yearlyStatsLogic.getYearStatsTrx(arg.buildingName, arg.date).then((result) => {
      event.sender.send("year-stats", { data: result });
    }).catch((error) => {
      event.reply("year-stats", { error: error.message });
    });
  });

}

module.exports = yearlyStatsIpc;