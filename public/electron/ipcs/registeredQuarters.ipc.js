const { ipcMain } = require('electron');
const RegisteredQuartersLogic = require('../../backend/logic/RegisteredQuartersLogic');

const RegisteredQuartersIpc = (connection) => {

  const registeredQuartersLogic = new RegisteredQuartersLogic(connection);

  ipcMain.on('get-registered-quarters', (event, params) => {
    registeredQuartersLogic.getAllRegisteredQuarters(params).then((result) => {
      event.sender.send("registered-quarters-data", { data: result });
    }).catch((error) => {
      event.reply("registered-quarters-data", { error: error.message });
    });
  });

}

module.exports = RegisteredQuartersIpc;