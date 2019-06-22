import { ipcRenderer } from 'electron';

class IOController {

  /**
   * export data to excel file xlsx
   * params {
   *  filename,
   *  sheetTitle,
   *  data
   * }
   */
  print() {
    let content = window.document;
    //request month expanses data
    ipcRenderer.send("print", content);
  }




}

export default IOController;