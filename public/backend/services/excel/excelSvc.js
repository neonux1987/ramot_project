
const monthExpansesWorkbook = require('./workbooks/monthExpansesWorkbook');
const budgetExecutionWorkbook = require('./workbooks/budgetExecutionWorkbook');
const summarizedBudgetsWorkbook = require('./workbooks/summarizedBudgetsWorkbook');
const SettingsLogic = require('../../logic/SettingsLogic');
const IOLogic = require('../../logic/IOLogic');
const fse = require('fs-extra')

const exportExcel = async (buildingName, buildingNameEng, pageName, fileName, date, data) => {
  // fill the workbook with data
  const filledWorkBook = getPageWorkbook(buildingName, buildingNameEng, pageName, date, data);
  return filledWorkBook.then((workbook) => {
    return workbook.xlsx.writeFile(`${fileName}.xlsx`);
  })
}

async function createStructure(pageName, fileName, date) {

  const settingsLogic = new SettingsLogic();
  const iOLogic = new IOLogic();

  const locations = await settingsLogic.getSpecificSetting(SettingsLogic.SETTINGS_NAMES.LOCATIONS);

  const { reports_folder } = locations;

  // With Promises:
  fse.ensureDir(reports_folder)
    .catch(err => {
      console.error(err);
      throw err;
    });

  /*  switch(pageName){
     case "monthExpanses": {
       
     }
   } */

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