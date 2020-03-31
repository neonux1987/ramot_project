const { ipcMain } = require('electron');
const ReportsGeneratorLogic = require('../../backend/logic/ReportsGeneratorLogic');

const reportsGeneratorIpc = () => {
  //fetch month expanses data
  const reportsGeneratorLogic = new ReportsGeneratorLogic();

  ipcMain.on('generate-empty-reports', (event, params) => {
    reportsGeneratorLogic.generateEmptyReports(params.date).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("empty-reports-generated", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("empty-reports-generated", { error: error.message });
    });
  });
}

module.exports = reportsGeneratorIpc;