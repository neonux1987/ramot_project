import Excel from 'exceljs';
import monthExpansesWorkbook from './excel/monthExpansesWorkbook';
import budgetExecutionWorkbook from './excel/budgetExecutionWorkbook';


export default (pageName, excel) => {

  //create new empty workbook
  const emptyWorkbook = new Excel.Workbook();

  // fill the workbook with data
  const filledWorkBook = whichPage(pageName, emptyWorkbook, excel);

  filledWorkBook.xlsx.writeFile(excel.fileName)
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