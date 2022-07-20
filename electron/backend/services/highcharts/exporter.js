const chartExporter = require("highcharts-export-server");
const fse = require("fs-extra");
const SystemPaths = require("../../system/SystemPaths");

chartExporter.enableFileLogging(
  SystemPaths.paths.logs_folder_path,
  "ramot-group-errors.log"
);

const DEFAULT_TEMPLATE = {
  type: "png",
  // By default the width of the chart images is of 600
  // In this case, we want a big image
  width: 1200
};

function initPool() {
  // init phantom workers
  chartExporter.initPool({
    initialWorkers: 2,
    maxWorkers: 6
  });
}

function killPool() {
  // stop exporter
  chartExporter.killPool();
}

async function exportChart({ template = {}, filepath }) {
  return new Promise((resolve, reject) => {
    // Export chart using these options
    chartExporter.export(
      {
        ...DEFAULT_TEMPLATE,
        ...template
      },
      async (err, res) => {
        if (err) {
          reject();
        }

        // Get the image data (base64)
        let imageb64 = res.data;

        try {
          const fileContents = Buffer.from(imageb64, "base64");
          await fse.writeFile(filepath, fileContents);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      }
    );
  });
}

module.exports = {
  exportChart,
  initPool,
  killPool
};
