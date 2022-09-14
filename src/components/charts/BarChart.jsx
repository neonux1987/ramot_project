import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import BarChartPrint from "./BarChartPrint";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title }) => {
  const printMode = useSelector((store) => store.print.printMode);
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);
  const [chartData, setChartData] = useState(data);

  const [options] = useState({
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
        onClick: (event, legendItem, legend) => {
          // for print
          setChartData((prev) => {
            const dataCopy = {
              ...prev,
              datasets: [...prev.datasets]
            };
            dataCopy.datasets[legendItem.datasetIndex].hidden =
              !dataCopy.datasets[legendItem.datasetIndex].hidden;

            return dataCopy;
          });

          // default behavior
          ChartJS.defaults.plugins.legend.onClick(event, legendItem, legend);
        },
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
        text: title,
        color: "#000000",
        font: {
          size: 32
        }
      }
    }
  });

  useEffect(() => {
    setChartData(data);
  }, [data]);

  return (
    <div
      style={{
        position: "relative",
        height: isFullscreen ? "calc(100vh - 220px)" : "600px"
      }}
    >
      {printMode && (
        <BarChartPrint printMode={printMode} data={chartData} title={title} />
      )}
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
