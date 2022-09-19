const { ipcMain } = require("electron");
const RegisteredReportsLogic = require("../backend/logic/RegisteredReportsLogic");

const registeredReportsIpc = (connection) => {
  const registeredReportsLogic = new RegisteredReportsLogic(connection);

  ipcMain.on("get-registered-reports-grouped-by-year", (event) => {
    registeredReportsLogic
      .getRegisteredReportsGroupedByYear()
      .then((result) => {
        event.sender.send("registered-reports-grouped-by-year-data", {
          data: result
        });
      })
      .catch((error) => {
        event.reply("registered-reports-grouped-by-year-data", {
          error: error.message
        });
      });
  });

  ipcMain.on("get-registered-reports-by-buildingId", (event, buildingId) => {
    registeredReportsLogic
      .getRegisteredReportsByBuildingId(buildingId)
      .then((result) => {
        event.sender.send("registered-reports-by-buildingId-data", {
          data: result
        });
      })
      .catch((error) => {
        event.reply("registered-reports-by-buildingId-data", {
          error: error.message
        });
      });
  });

  ipcMain.on("get-registered-reports-by-year", (event, year) => {
    registeredReportsLogic
      .getRegisteredReportsByYear(year)
      .then((result) => {
        event.sender.send("registered-reports-by-year-data", { data: result });
      })
      .catch((error) => {
        event.reply("registered-reports-by-year-data", {
          error: error.message
        });
      });
  });

  ipcMain.on(
    "get-registered-reports-by-year-grouped-by-buildingId",
    (event, { buildingId, year }) => {
      registeredReportsLogic
        .getRegisteredReportsByYearByBuildingId(buildingId, year)
        .then((result) => {
          event.sender.send(
            "registered-reports-by-year-grouped-by-buildingId-data",
            { data: result }
          );
        })
        .catch((error) => {
          event.reply("registered-reports-by-year-grouped-by-buildingId-data", {
            error: error.message
          });
        });
    }
  );
};

module.exports = registeredReportsIpc;
