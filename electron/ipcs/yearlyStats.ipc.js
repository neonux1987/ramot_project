const { ipcMain } = require('electron');
const YearlyStatsLogic = require('../backend/logic/YearlyStatsLogic');

const yearlyStatsIpc = (connection) => {

  const yearlyStatsLogic = new YearlyStatsLogic(connection);

  ipcMain.on('get-year-stats', (event, arg) => {
    yearlyStatsLogic.getYearStatsTrx(arg.buildingName, arg.date).then((result) => {
      event.sender.send("year-stats", { data: result });
    }).catch((error) => {
      event.reply("year-stats", { error: error.message });
    });
  });

  ipcMain.on('get-yearly-stats-by-year-range', (event, { buildingName, fromYear, toYear }) => {
    yearlyStatsLogic.getYearStatsByYearRange(buildingName, fromYear, toYear).then((result) => {
      event.sender.send("yearly-stats-by-year-range", { data: result });
    }).catch((error) => {
      event.reply("yearly-stats-by-year-range", { error: error.message });
    });
  });

  ipcMain.on('get-all-buildings-stats-by-year', (event, year) => {
    yearlyStatsLogic.getAllBuildingsStatsByYear(year).then((result) => {
      event.sender.send("all-buildings-stats-by-year-data", { data: result });
    }).catch((error) => {
      event.reply("all-buildings-stats-by-year-data", { error: error.message });
    });
  });

}

module.exports = yearlyStatsIpc;