const { ipcMain } = require('electron');
const RegisteredReportsLogic = require('../../backend/logic/RegisteredReportsLogic');

const registeredReportsIpc = (connection) => {

  const registeredReportsLogic = new RegisteredReportsLogic(connection);

  ipcMain.on('get-registered-reports-grouped-by-year', (event) => {
    registeredReportsLogic.getRegisteredReportsGroupedByYear().then((result) => {
      event.sender.send("registered-reports-grouped-by-year-data", { data: result });
    }).catch((error) => {
      event.reply("registered-reports-grouped-by-year-data", { error: error.message });
    });
  });

}

module.exports = registeredReportsIpc;