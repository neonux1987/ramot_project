const { ipcMain } = require('electron');
const SummarizedSectionsLogic = require('../../backend/logic/SummarizedSectionsLogic');

const summarizedSectionsIpc = (connection) => {

  //fetch month expanses data
  const summarizedSectionsLogic = new SummarizedSectionsLogic(connection);

  ipcMain.on('get-summarized-sections-data', (event, arg) => {
    summarizedSectionsLogic.getAllSummarizedSections().then((result) => {
      //let data = nestHydrationJS.nest(result, DEFINITION);
      event.sender.send("summarized-sections-data", result);
    }).catch((err) => {
      throw err;
    });
  });

}

module.exports = summarizedSectionsIpc;