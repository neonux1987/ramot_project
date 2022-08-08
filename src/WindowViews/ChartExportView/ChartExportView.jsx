import { ipcRenderer } from "electron";
import React, { useEffect, useRef, useState } from "react";
import Chart from "./Chart";

const ChartExportView = () => {
  const [chartsDataQueue, setChartsDataQueue] = useState(null);
  const [chartDataUrls, setChartDataUrls] = useState(new Map());

  const onFinished = useRef();

  onFinished.current = ({ index, dataUrl }) => {
    const chartData = { ...chartsDataQueue[index] };

    const newMap = Object.assign({}, chartDataUrls);
    console.log(newMap);
    newMap.set(index, {
      dataUrl,
      filePath: chartData.filePath
    });

    setChartDataUrls(newMap);
  };

  useEffect(() => {
    const fetchData = async () => {
      const buildings = await ipcRenderer.invoke("get-charts-data-to-export");

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
      chartsDataQueue.length === chartDataUrls.size()
    ) {
      console.log("yes");
      //ipcRenderer.send("charts-ready", [...chartDataUrls.values()]);
    }
  }, [chartsDataQueue, chartDataUrls]);

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
