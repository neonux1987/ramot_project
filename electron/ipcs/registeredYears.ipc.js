const { ipcMain } = require('electron');
const RegisteredYearsLogic = require('../backend/logic/RegisteredYearsLogic');

const RegisteredYearsIpc = (connection) => {

  const registeredYearsLogic = new RegisteredYearsLogic(connection);

  ipcMain.on('get-registered-years', (event, arg) => {
    registeredYearsLogic.getAllRegisteredYears(arg.buildingId).then((result) => {
      event.sender.send("registered-years-data", { data: result });
    }).catch((error) => {
      event.reply("registered-years-data", { error: error.message });
    });
  });

}

module.exports = RegisteredYearsIpc;