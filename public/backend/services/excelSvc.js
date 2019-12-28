const Excel = require('exceljs');
const monthExpansesWorkbook = './excel/monthExpansesWorkbook';
const budgetExecutionWorkbook = './excel/budgetExecutionWorkbook';


export default (pageName, excelData) => {

  //create new empty workbook
  const emptyWorkbook = new Excel.Workbook();

  // fill the workbook with data
  const filledWorkBook = whichPage(pageName, emptyWorkbook, excelData);

  filledWorkBook.xlsx.writeFile(excelData.fileName)
    .then(function () {
      console.log("Successfully Written to File.");
    });

}

function whichPage(pageName, workbook, excelData) {
  switch (pageName) {
    case "monthExpanses": return monthExpansesWorkbook(workbook, excelData);
    case "budgetExecution": return budgetExecutionWorkbook(workbook, excelData);
    default: return pageName;
  }
}