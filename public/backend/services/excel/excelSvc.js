
const monthExpansesWorkbook = require('./workbooks/monthExpansesWorkbook');
const budgetExecutionWorkbook = require('./workbooks/budgetExecutionWorkbook');


const exportExcel = (pageName, excelData) => {
  // fill the workbook with data
  const filledWorkBook = getPageWorkbook(pageName, excelData);

  return filledWorkBook.xlsx.writeFile(`${excelData.fileName}.xlsx`);
}

function getPageWorkbook(pageName, excelData) {
  switch (pageName) {
    case "monthExpanses": return monthExpansesWorkbook(excelData);
    case "budgetExecutions": return budgetExecutionWorkbook(excelData);
    default: return pageName;
  }
}

module.exports = {
  exportExcel
};