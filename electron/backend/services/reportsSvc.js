const exportReports = async (date, buildings) => {
  const { exportExcel } = require("./excel/excelSvc");
  const chartExporter = require('./highcharts/exporter');
  const fse = require('fs-extra');
  const path = require('path');

  const SettingsLogic = require('../logic/SettingsLogic');
  const MonthExpansesLogic = require('../logic/MonthExpansesLogic');
  const MonthlyStatsLogic = require('../logic/MonthlyStatsLogic');
  const BudgetExecutionLogic = require('../logic/BudgetExecutionLogic');
  const SummarizedBudgetLogic = require('../logic/SummarizedBudgetLogic');
  const RegisteredMonths = require('../logic/RegisteredMonthsLogic');
  const RegisteredReportsLogic = require('../logic/RegisteredReportsLogic');
  const ServiceError = require('../customErrors/ServiceError');

  const { asyncForEach } = require('../../helpers/utils');

  const { year, quarter, quarterHeb } = date;

  const settingsLogic = new SettingsLogic();
  const summarizedBudgetLogic = new SummarizedBudgetLogic();
  const monthExpansesLogic = new MonthExpansesLogic();
  const budgetExecutionLogic = new BudgetExecutionLogic();
  const registeredMonths = new RegisteredMonths();
  const monthlyStatsLogic = new MonthlyStatsLogic();
  const registeredReportsLogic = new RegisteredReportsLogic();

  chartExporter.initPool();


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
    const { buildingName, buildingId } = building;

    const reports = await registeredReportsLogic.getRegisteredReportsByBuildingId(buildingId);

    if (reports.length === 0) {
      return;
    }

    const buildingFolder = path.join(reports_folder_path, buildingName);
    const yearFolder = path.join(buildingFolder, `שנה ${year}`);
    const quarterFolder = path.join(yearFolder, quarterHeb);

    //ensure the building folder exist, if not create it
    await fse.ensureDir(buildingFolder);

    const summarizedBudgetData = await summarizedBudgetLogic.getAll(buildingId, date);

    // there is no situation where summarized budgets data for 
    // the specific year doesn't exist while budget executions 
    // data and month expanses data in that year exist
    if (summarizedBudgetData.length === 0)
      throw new ServiceError(`לא ניתן ליצור קובץ אקסל לסיכום שנתי של שנת ${year}, כי הנתונים לא קיימים.`);

    await fse.ensureDir(yearFolder);//ensure the year folder exist, if not create it
    const summarizedBudgetsFileName = getSummarizedBudgetsFilename(year);
    const summarizedBudgetsFilePath = path.join(yearFolder, summarizedBudgetsFileName);
    await exportExcel(buildingName, buildingId, "summarizedBudgets", summarizedBudgetsFilePath, date, summarizedBudgetData);

    const budgetExecutionData = await budgetExecutionLogic.getAllByQuarter({
      buildingName: buildingId,
      buildingNameHeb: buildingName
    },
      date);

    //ensure the quarter folder exist, if not create it
    await fse.ensureDir(quarterFolder);
    const budgetExecutionFileName = getBudgetExecutionFilename(quarterHeb);
    const budgetExecutionFilePath = path.join(quarterFolder, budgetExecutionFileName);
    await exportExcel(buildingName, buildingId, "budgetExecutions", budgetExecutionFilePath, date, budgetExecutionData);

    //create reports for the registered months
    const registeredMonthsData = await registeredMonths.getAllByQuarter(buildingId, { year, quarter });

    // inside the quarter folder create excel reports
    // for all the months of the quarter
    await asyncForEach(registeredMonthsData, async (registeredMonth) => {
      const { monthHeb, month } = registeredMonth;

      // summarized budget excel in the year folder
      const monthExpansesData = await monthExpansesLogic.getAllMonthExpansesTrx(buildingId, { year, month });

      const monthExpansesFileName = getMonthExpansesFilename(monthHeb);
      const monthExpansesFilePath = path.join(quarterFolder, monthExpansesFileName);
      // add the month properties to date
      const newDate = { ...date, monthHeb };
      await exportExcel(buildingName, buildingId, "monthExpanses", monthExpansesFilePath, newDate, monthExpansesData);

    });

    const monthlyStatsData = await monthlyStatsLogic.getAllMonthsStatsByYear(buildingId, year);

    if (monthlyStatsData.length > 0) {
      // export charts for each building
      const exportConfig = prepareAndExportChart({
        filepath: path.join(yearFolder, `הוצאות והכנסות שנה ${year}.png`),
        data: monthlyStatsData,
        title: `${buildingName} הוצאות והכנסות שנה ${year}`
      });

      await chartExporter.exportChart(exportConfig)
    }

  });

  // stop exporter
  chartExporter.killPool();

}

function prepareAndExportChart(config) {
  const { columnChart } = require("./highcharts/chartTemplates");

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
  config.template = {
    options: columnChart(config.title, chartData.series, chartData.categories)
  }

  return config;
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
  exportReports
};