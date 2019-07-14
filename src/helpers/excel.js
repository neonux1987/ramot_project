import Excel from 'exceljs';
import monthExpansesWorkbook from './excel/monthExpansesWorkbook';
import budgetExecutionWorkbook from './excel/budgetExecutionWorkbook';


export default (pageName, excel) => {
  //create work book
  var workbook = new Excel.Workbook();

  whichPage(pageName, workbook, excel);
  workbook.xlsx.writeFile(`${excel.fileName}.xlsx`)
    .then(function () {
      console.log("Successfully Written to File.");
    });

}

function whichPage(pageName, workbook, excel) {
  switch (pageName) {
    case "monthExpanses": return monthExpansesWorkbook(workbook, excel);
    case "budgetExecution": return budgetExecutionWorkbook(workbook, excel);
    default: return pageName;
  }
}