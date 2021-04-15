const { ipcMain } = require('electron');
const SummarizedSectionsLogic = require('../backend/logic/SummarizedSectionsLogic');

const summarizedSectionsIpc = (connection) => {

  //fetch month expanses data
  const summarizedSectionsLogic = new SummarizedSectionsLogic(connection);

  ipcMain.on('get-summarized-sections-data', (event, status) => {

    summarizedSectionsLogic.getAllSummarizedSectionsOrderedTrx(status).then((result) => {
      event.sender.send("summarized-sections-data", { data: result });
    }).catch((error) => {
      event.reply("summarized-sections-data", { error: error.message });
    });
  });

  ipcMain.on('add-summarized-section', (event, params) => {

    summarizedSectionsLogic.addSummarizedSection(params).then((result) => {
      event.sender.send("summarized-section-added", { data: result });
    }).catch((error) => {
      event.reply("summarized-section-added", { error: error.message });
    });
  });

  ipcMain.on('update-summarized-section', (event, params) => {

    summarizedSectionsLogic.updateSummarizedSection(params).then((result) => {
      event.sender.send("summarized-section-updated", { data: result });
    }).catch((error) => {
      event.reply("summarized-section-updated", { error: error.message });
    });
  });

  ipcMain.on('delete-summarized-section', (event, params) => {

    summarizedSectionsLogic.deleteSummarizedSection(params).then((result) => {
      event.sender.send("summarized-section-deleted", { data: result });
    }).catch((error) => {
      event.reply("summarized-section-deleted", { error: error.message });
    });
  });

}

module.exports = summarizedSectionsIpc;