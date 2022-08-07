import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import Chart from "./Chart";

const ChartExportView = () => {
  const [chartsDataQueue, setChartsDataQueue] = useState([]);
  const [chartDataUrls, setChartDataUrls] = useState([]);

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

  /* useEffect(() => {
    if (chartsDataQueue.length === 0) console.log(chartDataUrls);
  }, [chartsDataQueue, chartDataUrls]); */

  if (chartsDataQueue.length > 0)
    return chartsDataQueue.map(
      ({ datasets, labels, filePath, title }, index) => {
        console.log("wtf");
        return (
          <Chart
            data={{
              datasets,
              labels
            }}
            key={title}
            title={title}
            filePath={filePath}
            setChartDataUrls={setChartDataUrls}
            setChartsDataQueue={setChartsDataQueue}
            index={index}
          />
        );
      }
    );

  return null;
};

export default React.memo(ChartExportView);
