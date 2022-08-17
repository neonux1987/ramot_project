const { ipcMain } = require("electron");
const RestoreDbLogic = require("../backend/logic/RestoreDbLogic");

const restoreDbIpc = () => {
  const restoreDbLogic = new RestoreDbLogic();

  ipcMain.on("restore-from-list", (event, { fileName, withConfig }) => {
    restoreDbLogic
      .restoreFromList(fileName, withConfig)
      .then((result) => {
        event.reply("db-restored-from-list", { data: result });
      })
      .catch((error) => {
        event.reply("db-restored-from-list", { error: error.message });
      });
  });

  ipcMain.on("restore-from-file", (event, { fileName, withConfig }) => {
    restoreDbLogic
      .restoreFromFile(fileName, withConfig)
      .then((result) => {
        event.reply("db-restored-from-file", { data: result });
      })
      .catch((error) => {
        event.reply("db-restored-from-file", { error: error.message });
      });
  });

  ipcMain.on("reset-db", (event, { withConfig }) => {
    restoreDbLogic
      .resetDB(withConfig)
      .then((result) => {
        event.reply("reset-db", { data: result });
      })
      .catch((error) => {
        event.reply("db-resetted", { error: error.message });
      });
  });
};

module.exports = restoreDbIpc;
