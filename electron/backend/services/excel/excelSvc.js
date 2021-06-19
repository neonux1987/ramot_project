
const monthExpansesWorkbook = require('./workbooks/monthExpansesWorkbook');
const budgetExecutionWorkbook = require('./workbooks/budgetExecutionWorkbook');
const summarizedBudgetsWorkbook = require('./workbooks/summarizedBudgetsWorkbook');

const exportExcel = async (buildingName, buildingId, pageName, fileName, date, data, colorSet) => {
  // fill the workbook with data
  const filledWorkBook = getPageWorkbook(buildingName, buildingId, pageName, date, data, colorSet);
  return filledWorkBook.then((workbook) => {
    return workbook.xlsx.writeFile(`${fileName}.xlsx`);
  })
}


function getPageWorkbook(buildingName, buildingId, pageName, date, data, colorSet) {
  switch (pageName) {
    case "monthExpanses": return monthExpansesWorkbook(buildingName, date, data, colorSet);
    case "budgetExecutions": return budgetExecutionWorkbook(buildingName, buildingId, date, data, colorSet);
    case "summarizedBudgets": return summarizedBudgetsWorkbook(buildingName, buildingId, date, data, colorSet);
    default: return null;
  }
}

module.exports = {
  exportExcel
};