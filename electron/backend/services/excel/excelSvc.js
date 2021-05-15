
const monthExpansesWorkbook = require('./workbooks/monthExpansesWorkbook');
const budgetExecutionWorkbook = require('./workbooks/budgetExecutionWorkbook');
const summarizedBudgetsWorkbook = require('./workbooks/summarizedBudgetsWorkbook');

const exportExcel = async (buildingName, buildingId, pageName, fileName, date, data) => {
  // fill the workbook with data
  const filledWorkBook = getPageWorkbook(buildingName, buildingId, pageName, date, data);
  return filledWorkBook.then((workbook) => {
    return workbook.xlsx.writeFile(`${fileName}.xlsx`);
  })
}


function getPageWorkbook(buildingName, buildingId, pageName, date, data) {
  switch (pageName) {
    case "monthExpanses": return monthExpansesWorkbook(buildingName, date, data);
    case "budgetExecutions": return budgetExecutionWorkbook(buildingName, buildingId, date, data);
    case "summarizedBudgets": return summarizedBudgetsWorkbook(buildingName, buildingId, date, data);
    default: return null;
  }
}

module.exports = {
  exportExcel
};