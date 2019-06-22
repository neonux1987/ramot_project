import { ipcRenderer } from 'electron';

class MonthExpansesController {

  /**
   * get building month expanses data
   * params {
   *  buildingName,
   *  year,
   *  month
   * }
   * returns array of objects which represents the month expanses data
   */
  getAllMonthExpanses(params, callback) {
    //request month expanses data
    ipcRenderer.send("get-month-expanses-data", params);
    try {
      ipcRenderer.once("month-expanses-data", (event, result) => {
        callback(result);
      });
    } catch (error) {
      console.log("error");
    }
  }

  updateMonthExpanse(params, callback) {

    //request month expanses data
    ipcRenderer.send("update-month-expanse", params);

    try {
      ipcRenderer.once("month-expanse-updated", (event, result) => {
        callback(result);
      });
    } catch (error) {
      console.log(error);
    }

  }

  addNewMonthExpanse(params, callback) {

    //request month expanses data
    ipcRenderer.send("add-new-month-expanse", params);

    try {
      ipcRenderer.once("month-expanse-added", (event, result) => {
        callback(result);
      });
    } catch (error) {
      console.log(error);
    }

  }

}

export default MonthExpansesController;