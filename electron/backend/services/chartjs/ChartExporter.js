const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const fse = require("fs-extra");
const ServiceError = require("../../customErrors/ServiceError");

const config = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  scales: {
    y: {
      position: "right",
      reverse: false,
      grid: {
        circular: true
      },
      ticks: {
        color: "#000000",
        font: {
          size: 16,
          weight: 600
        }
      },
      grace: "5%"
    },
    x: {
      position: "left",
      reverse: false,
      grid: {
        circular: true
      },
      ticks: {
        color: "#000000",
        font: {
          size: 16,
          weight: 600
        }
      }
    }
  },
  plugins: {
    legend: {
      position: "top",
      rtl: true,
      reverse: true,
      labels: {
        color: "#000000",
        font: {
          size: 14,
          weight: 600
        }
      }
    },
    title: {
      display: false,
      text: "",
      color: "#000000",
      font: {
        size: 32
      }
    }
  }
};

class ChartExporter {
  constructor(width = 1280, height = 720) {
    this.chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
    console.log("da");
  }

  async exportImage({ filePath, data, title }) {
    try {
      const newConfig = { ...config };
      newConfig.data = data;
      newConfig.plugins.title.text = title;

      const imageBuffer = await this.chartJSNodeCanvas.renderToBuffer(
        newConfig
      );
      await fse.writeFile(filePath, imageBuffer);
    } catch (error) {
      console.log(error);
      throw new ServiceError(
        "המערכת לא הצליחה לשמור את הגרף כתמונה",
        "ChartExporter.js",
        error
      );
    }
  }
}

module.exports = ChartExporter;
