
const monthExpansesWorkbook = require('./workbooks/monthExpansesWorkbook');
const budgetExecutionWorkbook = require('./workbooks/budgetExecutionWorkbook');
const summarizedBudgetsWorkbook = require('./workbooks/summarizedBudgetsWorkbook');
const SettingsLogic = require('../../logic/SettingsLogic');
const SummarizedBudgetLogic = require('../../logic/SummarizedBudgetLogic');
const MenuDao = require('../../dao/MenuDao');
const fse = require('fs-extra');
const path = require('path');

const { asyncForEach } = require('../../../helpers/utils');

const exportExcel = async (buildingName, buildingNameEng, pageName, fileName, date, data) => {
  console.log(fileName);
  // fill the workbook with data
  const filledWorkBook = getPageWorkbook(buildingName, buildingNameEng, pageName, date, data);
  return filledWorkBook.then((workbook) => {
    return workbook.xlsx.writeFile(`${fileName}.xlsx`);
  })
}

const exportExcelBulk = async (date) => {

  const { year, quarter, quarterHeb, quarterEng } = date;

  const settingsLogic = new SettingsLogic();
  const summarizedBudgetLogic = new SummarizedBudgetLogic();
  const menuDao = new MenuDao();

  const locations = await settingsLogic.getSpecificSetting(SettingsLogic.SETTINGS_NAMES.LOCATIONS);

  const { reports_folder } = locations;

  // ensure te folder exist, if not create it
  await fse.ensureDir(reports_folder);

  const menuData = await menuDao.getMenu();

  await asyncForEach(menuData, async (building) => {
    const { label, engLabel, submenu } = building;

    const buildingFolder = path.join(reports_folder, label);
    const yearFolder = path.join(buildingFolder, `${year}`);
    const quarterFolder = path.join(yearFolder, quarterHeb);

    //ensure the building folder exist, if not create it
    await fse.ensureDir(buildingFolder);

    //ensure the year folder exist, if not create it
    await fse.ensureDir(yearFolder);

    const summarizedBudgetsFileName = getSummarizedBudgetsFilename(label, { year });
    const summarizedBudgetsFilePath = path.join(yearFolder, summarizedBudgetsFileName);

    const summarizedBudgetData = await summarizedBudgetLogic.getSummarizedBudgetsByRange(engLabel, date);
    console.log(summarizedBudgetData);
    await exportExcel(label, engLabel, "summarizedBudgets", summarizedBudgetsFilePath, date, summarizedBudgetData);

    //ensure the quarter folder exist, if not create it
    await fse.ensureDir(quarterFolder);

    await asyncForEach(submenu, async (page) => {
      const pageFolder = path.join(buildingFolder, page.label);

      //ensure the dir exist, if not create it
      await fse.ensureDir(pageFolder);

    });

  });

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
  exportExcelBulk,
  getMonthExpansesFilename,
  getBudgetExecutionFilename,
  getSummarizedBudgetsFilename
};