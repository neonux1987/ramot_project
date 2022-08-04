const monthExpansesWorkbook = require("../backend/services/excel/workbooks/monthExpansesWorkbook");
const budgetExecutionWorkbook = require("../backend/services/excel/workbooks/budgetExecutionWorkbook");
const summarizedBudgetsWorkbook = require("../backend/services/excel/workbooks/summarizedBudgetsWorkbook");

async function exportExcel({ buildingName, pageName, date, data, colorSet }) {
  // fill the workbook with data
  const filledWorkBook = getPageWorkbook(
    buildingName,
    pageName,
    date,
    data,
    colorSet
  );
  return filledWorkBook.then((workbook) => {
    return workbook.xlsx.writeFile(`${fileName}.xlsx`);
  });
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

  const promises = workerData.map(async (reportData) => {
    return await exportExcel(reportData);
  });

  const result = await Promise.all(promises);
  console.log(result);
  parentPort.postMessage({ success: true });
}

execute();
