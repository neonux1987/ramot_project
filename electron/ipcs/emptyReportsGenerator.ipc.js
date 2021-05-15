const { ipcMain } = require('electron');
const EmptyReportsGeneratorLogic = require('../backend/logic/EmptyReportsGeneratorLogic');

const emptyReportsGeneratorIpc = () => {
  //fetch month expanses data
  const emptyReportsGeneratorLogic = new EmptyReportsGeneratorLogic();

  ipcMain.on('generate-empty-reports', (event, params) => {
    emptyReportsGeneratorLogic.generateEmptyReports(params).then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.reply("empty-reports-generated", { data: result });
    }).catch((error) => {
      console.log(error);
      event.reply("empty-reports-generated", { error: error.message });
    });
  });
}

module.exports = emptyReportsGeneratorIpc;