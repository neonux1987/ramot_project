const { ipcMain } = require('electron');
const RegisteredMonthsLogic = require('../../backend/logic/RegisteredMonthsLogic');

const RegisteredMonthsIpc = (connection) => {

  const registeredMonthsLogic = new RegisteredMonthsLogic(connection);

  ipcMain.on('get-registered-months', (event, arg) => {
    registeredMonthsLogic.getAllRegisteredMonths(arg.buildingName).then((result) => {
      event.sender.send("registered-months-data", { data: result });
    }).catch((error) => {
      event.reply("registered-months-data", { error: error.message });
    });
  });

}

module.exports = RegisteredMonthsIpc;