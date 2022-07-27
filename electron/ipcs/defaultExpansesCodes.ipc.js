const { ipcMain } = require("electron");
const DefaultExpansesCodesLogic = require("../backend/logic/DefaultExpansesCodesLogic");

const defaultExpansesCodesIpc = (connection) => {
  //fetch month expanses data
  const expansesCodesLogic = new DefaultExpansesCodesLogic(connection);

  ipcMain.on("get-default-expanses-codes", (event, status) => {
    expansesCodesLogic
      .getDefaultExpansesCodesTrx(status)
      .then((result) => {
        event.sender.send("default-expanses-codes-data", { data: result });
      })
      .catch((error) => {
        event.reply("default-expanses-codes-data", { error: error.message });
      });
  });
};

module.exports = defaultExpansesCodesIpc;
