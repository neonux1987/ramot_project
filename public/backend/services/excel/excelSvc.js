
const monthExpansesWorkbook = require('./workbooks/monthExpansesWorkbook');
const budgetExecutionWorkbook = require('./workbooks/budgetExecutionWorkbook');
const summarizedBudgetsWorkbook = require('./workbooks/summarizedBudgetsWorkbook');

const exportExcel = (buildingName, buildingNameEng, pageName, fileName, date, data) => {
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

const getMonthExpansesFilename = (buildingName, date = { year: Number, month: String }) => {
  let monthHebName = this.convertEngToHebMonth(date.month);
  return `${buildingName} מעקב הוצאות חודש ${monthHebName} ${date.year}`;
}

const getBudgetExecutionFilename = (buildingName, date = { year: Number, quarter: Number }) => {
  let quarter = this.getQuarterHeb(date.quarter);
  return `${buildingName} ביצוע מול תקציב ${quarter} ${date.year}`;
}

const getSummarizedBudgetsFilename = (buildingName, date = { year: Number }) => {
  return `${buildingName} סיכום שנתי ${date.year}`;
}

module.exports = {
  exportExcel,
  getMonthExpansesFilename,
  getBudgetExecutionFilename,
  getSummarizedBudgetsFilename
};