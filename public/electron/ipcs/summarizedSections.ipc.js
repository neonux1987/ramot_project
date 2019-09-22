const { ipcMain } = require('electron');
const SummarizedSectionsLogic = require('../../backend/logic/SummarizedSectionsLogic');

const summarizedSectionsIpc = (connection) => {

  //fetch month expanses data
  const summarizedSectionsLogic = new SummarizedSectionsLogic(connection);

  ipcMain.on('get-summarized-sections-data', (event, arg) => {

    summarizedSectionsLogic.getAllSummarizedSectionsTrx().then((result) => {
      event.sender.send("summarized-sections-data", { data: result });
    }).catch((error) => {
      event.reply("summarized-sections-data", { error: error.message });
    });
  });

}

module.exports = summarizedSectionsIpc;