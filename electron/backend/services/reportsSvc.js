const { exportExcel } = require("./excel/excelSvc")
const { exportChart } = require('./highcharts/exporter');
const { columnChart } = require("./highcharts/chartTemplates");
const SystemPaths = require("../system/SystemPaths");

const exportReports = async (date, buildings) => {
  const chartExporter = require("highcharts-export-server");
  const fse = require('fs-extra');
  const path = require('path');

  const SettingsLogic = require('../logic/SettingsLogic');
  const MonthExpansesLogic = require('../logic/MonthExpansesLogic');
  const MonthlyStatsLogic = require('../logic/MonthlyStatsLogic');
  const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
  const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
  const RegisteredMonths = require('../logic/RegisteredMonthsLogic');
  const ServiceError = require('../customErrors/ServiceError');

  const { asyncForEach } = require('../../helpers/utils');

  const { year, quarter, quarterHeb } = date;

  const settingsLogic = new SettingsLogic();
  const summarizedBudgetLogic = new SummarizedBudgetLogic();
  const monthExpansesLogic = new MonthExpansesLogic();
  const budgetExecutionLogic = new BudgetExecutionLogic();
  const registeredMonths = new RegisteredMonths();
  const monthlyStatsLogic = new MonthlyStatsLogic();

  // Initialize the exporter
  chartExporter.initPool({
    initialWorkers: 1,
    maxWorkers: 1
  });

  chartExporter.enableFileLogging(SystemPaths.paths.logs_folder_path, "ramot-group-errors.log");

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
    const { buildingName, buildingNameEng } = building;

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

    const monthlyStatsData = await monthlyStatsLogic.getAllMonthsStatsByYear(buildingNameEng, year);

    if (monthlyStatsData.length > 0)
      // export charts for each building
      await prepareAndExportChart({
        chartExporter,
        fse,
        filename: path.join(yearFolder, `הוצאות והכנסות שנה ${year}.png`),
        data: monthlyStatsData,
        title: `${buildingName} הוצאות והכנסות שנה ${year}`
      });

  });

  // stop exporter
  chartExporter.killPool();

}

async function prepareAndExportChart(config) {

  const categories = [];
  const incomeData = [];
  const outcomeData = [];

  config.data.forEach((element) => {
    categories.push(element.month);
    incomeData.push(element.income);
    outcomeData.push(element.outcome);
  });

  const chartData = {
    categories,
    series: [
      {
        name: "הוצאות",
        data: outcomeData,
        color: "#30a3fc"
      },
      {
        name: "הכנסות",
        data: incomeData,
        color: "#30e8aa"
      }
    ]
  };
  config.template = columnChart(config.title, chartData.series, chartData.categories)

  await exportChart(config);
}

function getMonthExpansesFilename(monthHeb) {
  return `הוצאות חודש ${monthHeb}`;
}

function getBudgetExecutionFilename(quarterHeb) {
  return `ביצוע מול תקציב ${quarterHeb}`;
}

function getSummarizedBudgetsFilename(year) {
  return `סיכום שנתי ${year}`;
}

module.exports = {
  exportExcel,
  exportReports
};