
const monthExpansesWorkbook = require('./workbooks/monthExpansesWorkbook');
const budgetExecutionWorkbook = require('./workbooks/budgetExecutionWorkbook');
const summarizedBudgetsWorkbook = require('./workbooks/summarizedBudgetsWorkbook');

const exportExcel = async (buildingName, buildingNameEng, pageName, fileName, date, data) => {
  // fill the workbook with data
  const filledWorkBook = getPageWorkbook(buildingName, buildingNameEng, pageName, date, data);
  return filledWorkBook.then((workbook) => {
    return workbook.xlsx.writeFile(`${fileName}.xlsx`);
  })
}


function getPageWorkbook(buildingName, buildingNameEng, pageName, date, data) {
  switch (pageName) {
    case "monthExpanses": return monthExpansesWorkbook(buildingName, date, data);
    case "budgetExecutions": return budgetExecutionWorkbook(buildingName, buildingNameEng, date, data);
    case "summarizedBudgets": return summarizedBudgetsWorkbook(buildingName, buildingNameEng, date, data);
    default: return null;
  }
}

const getMonthExpansesFilename = (monthHeb) => {
  return `הוצאות חודש ${monthHeb}`;
}

const getBudgetExecutionFilename = (quarterHeb) => {
  return `ביצוע מול תקציב ${quarterHeb}`;
}

const getSummarizedBudgetsFilename = (year) => {
  return `סיכום שנתי ${year}`;
}

module.exports = {
  exportExcel,
  getMonthExpansesFilename,
  getBudgetExecutionFilename,
  getSummarizedBudgetsFilename
};