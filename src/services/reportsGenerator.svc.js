import { ipcRenderer } from 'electron';

export const generateEmptyReports = (date) => {
  // request request to backend to get the data
  ipcRenderer.send("generate-empty-reports", { date });

  return new Promise((resolve, reject) => {
    // listen when the data comes back
    return ipcRenderer.once("empty-reports-generated", (event, arg) => {
      if (arg.error) {
        reject(arg.error);
      } else {
        resolve("דוחות ריקים לחודשים שבחרת נוצרו בהצלחה.");
      } // end else
    });
  })
};