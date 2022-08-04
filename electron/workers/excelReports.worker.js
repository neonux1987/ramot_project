const monthExpansesWorkbook = require("../backend/services/excel/workbooks/monthExpansesWorkbook");
const budgetExecutionWorkbook = require("../backend/services/excel/workbooks/budgetExecutionWorkbook");
const summarizedBudgetsWorkbook = require("../backend/services/excel/workbooks/summarizedBudgetsWorkbook");

async function exportExcel({
  buildingName,
  pageName,
  date,
  data,
  colorSet,
  fileName
}) {
  try {
    // fill the workbook with data
    const finishedWorkbook = await getPageWorkbook(
      buildingName,
      pageName,
      date,
      data,
      colorSet
    );

    await finishedWorkbook.xlsx.writeFile(`${fileName}.xlsx`);

    return Promise.resolve(true);
  } catch (error) {
    throw error;
  }
}

function getPageWorkbook(buildingName, pageName, date, data, colorSet) {
  switch (pageName) {
    case "monthExpanses":
      return monthExpansesWorkbook(buildingName, date, data, colorSet);
    case "budgetExecutions":
      return budgetExecutionWorkbook(buildingName, date, data, colorSet);
    case "summarizedBudgets":
      return summarizedBudgetsWorkbook(buildingName, date, data, colorSet);
    default:
      return null;
  }
}

async function execute() {
  const { parentPort, workerData } = require("worker_threads");

  const promises = workerData.map((reportData) => {
    return exportExcel(reportData);
  });

  try {
    await Promise.all(promises);
    parentPort.postMessage({ success: true });
  } catch (error) {
    throw error;
  }
}

execute();
