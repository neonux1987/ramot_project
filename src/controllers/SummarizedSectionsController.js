import { ipcRenderer } from 'electron';

class SummarizedSectionsController {

  getAllSummarizedSections(params, callback) {

    //request month expanses data
    ipcRenderer.send("get-summarized-sections-data", params);
    ipcRenderer.once("summarized-sections-data", (event, result) => {
      callback(result);
    });
  }

}

export default SummarizedSectionsController;