const { ipcMain } = require('electron');
const QuarterTotalLogic = require('../../backend/logic/QuarterTotalLogic');

const quarterTotalIpc = (connection) => {

  const quarterTotalLogic = new QuarterTotalLogic(connection);

  ipcMain.on('get-quarter-total-stats', (event, arg) => {
    quarterTotalLogic.getQuarterTotalTrx(arg).then((result) => {
      event.sender.send("quarter-total-stats", { data: result });
    }).catch((error) => {
      event.reply("quarter-total-stats", { error: error.message });
    });
  });

}

module.exports = quarterTotalIpc;