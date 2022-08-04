// reportsQueue = {
//   buildingName,
//   pageName,
//   fileName,
//   date,
//   data,
//   colorSet
// }

const exportExcel = async (reportsQueue) => {
  return new Promise((resolve, reject) => {
    const { Worker } = require("worker_threads");
    const path = require("path");

    const worker = new Worker(
      path.join(__dirname, "../../../workers/excelReports.worker.js"),
      {
        workerData: reportsQueue
      }
    );
    worker.once("message", (data) => {
      resolve(data);
    });

    worker.once("error", (data) => {
      reject(data);
    });
  });
};

module.exports = {
  exportExcel
};
