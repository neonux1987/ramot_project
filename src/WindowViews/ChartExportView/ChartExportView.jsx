import { ipcRenderer } from "electron";
import React, { useEffect, useRef, useState } from "react";
import Chart from "./Chart";

const chartDataUrls = new Map();

const ChartExportView = () => {
  const [chartsDataQueue, setChartsDataQueue] = useState(null);
  const onFinished = useRef();

  onFinished.current = async ({ index, dataUrl }) => {
    const chartData = { ...chartsDataQueue[index] };

    chartDataUrls.set(index, {
      dataUrl,
      filePath: chartData.filePath
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const buildings = await ipcRenderer.invoke("get-charts-data-for-export");

      const processedChartData = [];

      // prepare the chart data
      buildings.forEach(({ rawChartData, filePath, title }) => {
        const labels = [];
        const incomeData = [];
        const outcomeData = [];

        rawChartData.forEach((element) => {
          labels.push(element.month);
          incomeData.push(element.income);
          outcomeData.push(element.outcome);
        });

        processedChartData.push({
          labels,
          filePath,
          title,
          datasets: [
            {
              label: "הוצאות",
              data: outcomeData,
              backgroundColor: "#30a3fc99",
              borderColor: "#30a3fc"
            },
            {
              label: "הכנסות",
              data: incomeData,
              backgroundColor: "#30e8aa99",
              borderColor: "#30e8aa"
            }
          ]
        });
      });

      setChartsDataQueue(processedChartData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      chartsDataQueue !== null &&
      chartsDataQueue.length === chartDataUrls.size
    ) {
      ipcRenderer.send("charts-ready", [...chartDataUrls.values()]);
    }
  });

  if (chartsDataQueue !== null)
    return chartsDataQueue.map(({ datasets, labels, title }, index) => {
      return (
        <Chart
          data={{
            datasets,
            labels
          }}
          key={title}
          title={title}
          index={index}
          onFinished={onFinished.current}
        />
      );
    });

  return null;
};

export default React.memo(ChartExportView);
