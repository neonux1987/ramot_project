import Excel from 'exceljs';
import monthExpansesWorkbook from './excel/monthExpansesWorkbook';
import budgetExecutionWorkbook from './excel/budgetExecutionWorkbook';


export default (fileName, sheetTitle, pageName, data) => {

  //create work book
  var workbook = new Excel.Workbook();

  whichPage(pageName, workbook, sheetTitle, data);

  workbook.xlsx.writeFile(fileName)
    .then(function () {
      console.log("Successfully Written to File.");
    });

}

function whichPage(pageName, workbook, sheetTitle, data) {
  switch (pageName) {
    case "monthExpanses": return monthExpansesWorkbook(workbook, sheetTitle, data);
    case "budgetExecution": return budgetExecutionWorkbook(workbook, sheetTitle, data);
    default: return pageName;
  }
}