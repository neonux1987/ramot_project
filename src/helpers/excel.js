import Excel from 'exceljs';
import monthExpansesWorkbook from './excel/monthExpansesWorkbook';
import budgetExecutionWorkbook from './excel/budgetExecutionWorkbook';


export default (fileName, sheetTitle, pageName, data, date) => {
  //create work book
  var workbook = new Excel.Workbook();

  whichPage(pageName, workbook, sheetTitle, data, date);

  workbook.xlsx.writeFile(`${fileName}`)
    .then(function () {
      console.log("Successfully Written to File.");
    });

}

function whichPage(pageName, workbook, sheetTitle, data, date) {
  switch (pageName) {
    case "monthExpanses": return monthExpansesWorkbook(workbook, sheetTitle, data, date);
    case "budgetExecution": return budgetExecutionWorkbook(workbook, sheetTitle, data, date);
    default: return pageName;
  }
}