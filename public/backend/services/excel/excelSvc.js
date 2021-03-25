
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

const exportExcelBulk = async (date, buildings) => {
  const fse = require('fs-extra');
  const path = require('path');

  const SettingsLogic = require('../../logic/SettingsLogic');
  const MonthExpansesLogic = require('../../logic/MonthExpansesLogic');
  const BudgetExecutionLogic = require('../../logic/BudgetExecutionLogic');
  const SummarizedBudgetLogic = require('../../logic/SummarizedBudgetLogic');
  const RegisteredMonths = require('../../logic/RegisteredMonthsLogic');
  const ServiceError = require('../../customErrors/ServiceError');

  const { asyncForEach } = require('../../../helpers/utils');

  const { year, quarter, quarterHeb } = date;

  const settingsLogic = new SettingsLogic();
  const summarizedBudgetLogic = new SummarizedBudgetLogic();
  const monthExpansesLogic = new MonthExpansesLogic();
  const budgetExecutionLogic = new BudgetExecutionLogic();
  const registeredMonths = new RegisteredMonths();

  const userSettings = await settingsLogic.getSpecificSetting(SettingsLogic.SETTINGS_NAMES.USER);

  // user reports folder
  const { reports_folder_path } = userSettings;

  // ensure the user reports folder exist, if not create it
  await fse.ensureDir(reports_folder_path);

  // loop through each building and create a year folder
  // inside the year folder create the summarized budgets excel
  // file for that year, also create a quarter folder and inside
  // that folder create the budget execution excel file
  await asyncForEach(buildings, async (building) => {
    const { buildingName, buildingNameEng, isChecked } = building;

    const buildingFolder = path.join(reports_folder_path, buildingName);
    const yearFolder = path.join(buildingFolder, `שנה ${year}`);
    const quarterFolder = path.join(yearFolder, quarterHeb);

    //ensure the building folder exist, if not create it
    await fse.ensureDir(buildingFolder);

    const summarizedBudgetData = await summarizedBudgetLogic.getAll(buildingNameEng, date);

    // there is no situation where summarized budgets data for 
    // the specific year doesn't exist while budget executions 
    // data and month expanses data in that year exist
    if (summarizedBudgetData.length === 0)
      throw new ServiceError(`לא ניתן ליצור קובץ אקסל לסיכום שנתי של שנת ${year}, כי הנתונים לא קיימים.`);

    await fse.ensureDir(yearFolder);//ensure the year folder exist, if not create it
    const summarizedBudgetsFileName = getSummarizedBudgetsFilename(year);
    const summarizedBudgetsFilePath = path.join(yearFolder, summarizedBudgetsFileName);
    await exportExcel(buildingName, buildingNameEng, "summarizedBudgets", summarizedBudgetsFilePath, date, summarizedBudgetData);

    const budgetExecutionData = await budgetExecutionLogic.getAllByQuarter({
      buildingName: buildingNameEng,
      buildingNameHeb: buildingName
    },
      date);

    //ensure the quarter folder exist, if not create it
    await fse.ensureDir(quarterFolder);
    const budgetExecutionFileName = getBudgetExecutionFilename(quarterHeb);
    const budgetExecutionFilePath = path.join(quarterFolder, budgetExecutionFileName);
    await exportExcel(buildingName, buildingNameEng, "budgetExecutions", budgetExecutionFilePath, date, budgetExecutionData);

    //create reports for the registered months
    const registeredMonthsData = await registeredMonths.getAllByQuarter(buildingNameEng, { year, quarter });

    // inside the quarter folder create excel reports
    // for all the months of the quarter
    await asyncForEach(registeredMonthsData, async (registeredMonth) => {
      const { monthHeb, month } = registeredMonth;

      // summarized budget excel in the year folder
      const monthExpansesData = await monthExpansesLogic.getAllMonthExpansesTrx(buildingNameEng, { year, month });

      const monthExpansesFileName = getMonthExpansesFilename(monthHeb);
      const monthExpansesFilePath = path.join(quarterFolder, monthExpansesFileName);
      // add the month properties to date
      const newDate = { ...date, monthHeb };
      await exportExcel(buildingName, buildingNameEng, "monthExpanses", monthExpansesFilePath, newDate, monthExpansesData);

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
  exportExcelBulk,
  getMonthExpansesFilename,
  getBudgetExecutionFilename,
  getSummarizedBudgetsFilename
};