const Helper = require("../../helpers/Helper");

const exportReports = async (date, buildings) => {
  const { exportExcel } = require("./excel/excelSvc");
  const { exportCharts } = require("./chartjs/ChartExporter");
  const fse = require("fs-extra");
  const path = require("path");

  const SettingsLogic = require("../logic/SettingsLogic");
  const MonthExpansesLogic = require("../logic/MonthExpansesLogic");
  const MonthlyStatsLogic = require("../logic/MonthlyStatsLogic");
  const QuarterlyStatsLogic = require("../logic/QuarterlyStatsLogic");
  const YearlyStatsLogic = require("../logic/YearlyStatsLogic");
  const BudgetExecutionLogic = require("../logic/BudgetExecutionLogic");
  const SummarizedBudgetLogic = require("../logic/SummarizedBudgetLogic");
  const RegisteredMonths = require("../logic/RegisteredMonthsLogic");
  const RegisteredReportsLogic = require("../logic/RegisteredReportsLogic");
  const ServiceError = require("../customErrors/ServiceError");

  const { asyncForEach } = require("../../helpers/utils");

  const { year, quarter, quarterHeb } = date;

  const settingsLogic = new SettingsLogic();
  const summarizedBudgetLogic = new SummarizedBudgetLogic();
  const monthExpansesLogic = new MonthExpansesLogic();
  const budgetExecutionLogic = new BudgetExecutionLogic();
  const registeredMonths = new RegisteredMonths();
  const monthlyStatsLogic = new MonthlyStatsLogic();
  const quarterlyStatsLogic = new QuarterlyStatsLogic();
  const yearlyStatsLogic = new YearlyStatsLogic();
  const registeredReportsLogic = new RegisteredReportsLogic();

  const userSettings = await settingsLogic.getUserSettings();
  const themeSettings = await settingsLogic.getThemeSettings();
  const colorSet = themeSettings.colorSet;

  const reportsQueue = [];
  const chartsQueue = [];

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

    const reports =
      await registeredReportsLogic.getRegisteredReportsByYearAndQuarter(
        buildingId,
        year,
        quarter
      );

    if (reports.length === 0) {
      return;
    }

    const buildingFolder = path.join(reports_folder_path, buildingName);
    const yearFolder = path.join(buildingFolder, `שנה ${year}`);
    const quarterFolder = path.join(yearFolder, quarterHeb);

    //ensure the building folder exist, if not create it
    await fse.ensureDir(buildingFolder);

    const summarizedBudgetData = await summarizedBudgetLogic.getAll(
      buildingId,
      date
    );

    // there is no situation where summarized budgets data for
    // the specific year doesn't exist while budget executions
    // data and month expanses data in that year exist
    if (summarizedBudgetData.length === 0)
      throw new ServiceError(
        `לא ניתן ליצור קובץ אקסל לסיכום שנתי של שנת ${year}, כי הנתונים לא קיימים.`
      );

    await fse.ensureDir(yearFolder); //ensure the year folder exist, if not create it
    const summarizedBudgetsFileName = getSummarizedBudgetsFilename(year);
    const summarizedBudgetsFilePath = path.join(
      yearFolder,
      summarizedBudgetsFileName
    );

    addSummarizedBudgetIncomeOutcome({
      data: summarizedBudgetData,
      date,
      buildingId,
      quarterlyStatsLogic,
      yearlyStatsLogic
    });

    reportsQueue.push({
      buildingName,
      pageName: "summarizedBudgets",
      fileName: summarizedBudgetsFilePath,
      date,
      data: summarizedBudgetData,
      colorSet
    });

    const budgetExecutionData = await budgetExecutionLogic.getAllByQuarter(
      {
        buildingName: buildingId,
        buildingNameHeb: buildingName
      },
      date
    );

    //ensure the quarter folder exist, if not create it
    await fse.ensureDir(quarterFolder);
    const budgetExecutionFileName = getBudgetExecutionFilename(quarterHeb);
    const budgetExecutionFilePath = path.join(
      quarterFolder,
      budgetExecutionFileName
    );

    // add income and outcome rows to budget execution data before export
    await addBudgetExecutionIncomeOutcome({
      date,
      data: budgetExecutionData,
      buildingId,
      quarterlyStatsLogic,
      monthlyStatsLogic
    });

    reportsQueue.push({
      buildingName,
      pageName: "budgetExecutions",
      fileName: budgetExecutionFilePath,
      date,
      data: budgetExecutionData,
      colorSet
    });

    //create reports for the registered months
    const registeredMonthsData = await registeredMonths.getAllByQuarter(
      buildingId,
      { year, quarter }
    );

    // inside the quarter folder create excel reports
    // for all the months of the quarter
    await asyncForEach(registeredMonthsData, async (registeredMonth) => {
      const { monthHeb, month } = registeredMonth;

      // summarized budget excel in the year folder
      const monthExpansesData = await monthExpansesLogic.getAllMonthExpansesTrx(
        buildingId,
        { year, month }
      );

      const monthExpansesFileName = getMonthExpansesFilename(monthHeb);
      const monthExpansesFilePath = path.join(
        quarterFolder,
        monthExpansesFileName
      );
      // add the month properties to date
      const newDate = { ...date, monthHeb };

      reportsQueue.push({
        buildingName,
        pageName: "monthExpanses",
        fileName: monthExpansesFilePath,
        date: newDate,
        data: monthExpansesData,
        colorSet
      });
    });

    const monthlyStatsData = await monthlyStatsLogic.getAllMonthsStatsByYear(
      buildingId,
      year
    );

    if (monthlyStatsData.length > 0) {
      chartsQueue.push({
        rawChartData: monthlyStatsData,
        filePath: path.join(yearFolder, `הוצאות והכנסות שנה ${year}.png`),
        title: `${buildingName} הוצאות והכנסות שנה ${year}`
      });
    }
  });

  try {
    await exportExcel(reportsQueue);
  } catch (error) {
    throw new ServiceError(error.message, "reportsSvc.js", error);
  }

  await exportCharts(chartsQueue);
};

function getMonthExpansesFilename(monthHeb) {
  return `הוצאות חודש ${monthHeb}`;
}

function getBudgetExecutionFilename(quarterHeb) {
  return `ביצוע מול תקציב ${quarterHeb}`;
}

function getSummarizedBudgetsFilename(year) {
  return `סיכום שנתי ${year}`;
}

async function exportReport({
  buildingName,
  buildingId,
  pageName,
  fileName,
  date,
  data
}) {
  const { exportExcel } = require("./excel/excelSvc");
  const SettingsLogic = require("../logic/SettingsLogic");
  const settingsLogic = new SettingsLogic();

  const themeSettings = await settingsLogic.getThemeSettings();
  const colorSet = themeSettings.colorSet;

  switch (pageName) {
    case "budgetExecutions":
      {
        const MonthlyStatsLogic = require("../logic/MonthlyStatsLogic");
        const QuarterlyStatsLogic = require("../logic/QuarterlyStatsLogic");

        const monthlyStatsLogic = new MonthlyStatsLogic();
        const quarterlyStatsLogic = new QuarterlyStatsLogic();

        // add rows of income and outcome
        await addBudgetExecutionIncomeOutcome({
          monthlyStatsLogic,
          quarterlyStatsLogic,
          data,
          date,
          buildingId
        });
      }
      break;
    case "summarizedBudgets":
      {
        const QuarterlyStatsLogic = require("../logic/QuarterlyStatsLogic");
        const YearlyStatsLogic = require("../logic/YearlyStatsLogic");

        const quarterlyStatsLogic = new QuarterlyStatsLogic();
        const yearlyStatsLogic = new YearlyStatsLogic();

        // add rows of income and outcome
        await addSummarizedBudgetIncomeOutcome({
          quarterlyStatsLogic,
          yearlyStatsLogic,
          data,
          date,
          buildingId
        });
      }
      break;
    default:
  }

  await exportExcel([
    { buildingName, pageName, fileName, date, data, colorSet, withExt: false }
  ]);

  return data;
}

async function addBudgetExecutionIncomeOutcome({
  data,
  date,
  buildingId,
  monthlyStatsLogic,
  quarterlyStatsLogic
}) {
  const monthlyStats = await monthlyStatsLogic.getAllMonthsStatsByQuarterTrx({
    buildingId,
    date
  });

  const incomeRow = {
    section: "הכנסות",
    evaluation: "",
    difference: "",
    notes: ""
  };
  const outcomeRow = {
    section: "הוצאות",
    evaluation: "",
    difference: "",
    notes: ""
  };

  monthlyStats.forEach((item) => {
    const engMonth = Helper.convertHebToEngMonth(item.month);

    incomeRow[`${engMonth}_budget`] = item.income;
    incomeRow[`${engMonth}_budget_execution`] = "";

    outcomeRow[`${engMonth}_budget`] = "";
    outcomeRow[`${engMonth}_budget_execution`] = item.outcome;
  });

  const quarterlyStats = await quarterlyStatsLogic.getQuarterStatsTrx({
    buildingId,
    date
  });

  incomeRow.total_budget = quarterlyStats[0].income;
  incomeRow.total_execution = "";

  outcomeRow.total_budget = "";
  outcomeRow.total_execution = quarterlyStats[0].outcome;

  data.push(incomeRow);
  data.push(outcomeRow);
}

async function addSummarizedBudgetIncomeOutcome({
  data,
  date,
  buildingId,
  quarterlyStatsLogic,
  yearlyStatsLogic
}) {
  const quarterlyStats = await quarterlyStatsLogic.getAllQuartersStatsByYearTrx(
    { buildingId, date }
  );

  const incomeRow = {
    section: "הכנסות",
    evaluation: "",
    notes: ""
  };
  const outcomeRow = {
    section: "הוצאות",
    evaluation: "",
    notes: ""
  };

  quarterlyStats.forEach((item) => {
    const { quarter } = item;

    incomeRow[`quarter${quarter}_budget`] = item.income;
    incomeRow[`quarter${quarter}_execution`] = "";

    outcomeRow[`quarter${quarter}_budget`] = "";
    outcomeRow[`quarter${quarter}_execution`] = item.outcome;
  });

  const yearlyStats = await yearlyStatsLogic.getYearStatsTrx(buildingId, date);

  incomeRow.year_total_budget = yearlyStats[0].income;
  incomeRow.year_total_execution = "";

  outcomeRow.year_total_budget = "";
  outcomeRow.year_total_execution = yearlyStats[0].outcome;

  data.push(incomeRow);
  data.push(outcomeRow);
}

module.exports = {
  exportReports,
  exportReport
};
