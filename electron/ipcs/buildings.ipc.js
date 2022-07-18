const { ipcMain } = require("electron");
const BuildingsLogic = require("../backend/logic/BuildingsLogic");

const buildingsIpc = () => {
  //fetch month expanses data
  const buildingsLogic = new BuildingsLogic();

  ipcMain.on("get-all-buildings", (event) => {
    buildingsLogic
      .getAllBuildings()
      .then((result) => {
        event.reply("all-buildings-data", { data: result });
      })
      .catch((error) => {
        event.reply("all-buildings-data", { error: error.message });
      });
  });

  ipcMain.on("get-buildings-by-status", (event, { status }) => {
    buildingsLogic
      .getBuildingsByStatus(status)
      .then((result) => {
        event.reply("by-status-buildings-data", { data: result });
      })
      .catch((error) => {
        event.reply("by-status-buildings-data", { error: error.message });
      });
  });

  ipcMain.on("add-building", (event, params) => {
    buildingsLogic
      .addBuilding(params)
      .then((result) => {
        event.reply("added-building", { data: result });
        event.sender.send("renderer-added-building-update");
      })
      .catch((error) => {
        event.reply("added-building", { error: error.message });
      });
  });

  ipcMain.on("remove-buildings", (event, params) => {
    buildingsLogic
      .removeBuildings(params)
      .then((result) => {
        event.reply("buildings-removed", { data: result });
      })
      .catch((error) => {
        event.reply("buildings-removed", { error: error.message });
      });
  });

  ipcMain.on("update-building", (event, params) => {
    buildingsLogic
      .updateBuilding(params)
      .then((result) => {
        event.reply("updated-building", { data: result });
        event.sender.send("renderer-updated-building-update");
      })
      .catch((error) => {
        event.reply("updated-building", { error: error.message });
      });
  });
};

module.exports = buildingsIpc;
