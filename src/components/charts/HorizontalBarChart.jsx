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
import HorizontalBarChartPrint from "./HorizontalBarChartPrint";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = ({ data, title }) => {
  const printMode = useSelector((store) => store.print.printMode);
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);

  const [options] = useState({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
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
        }
      },
      x: {
        position: "right",
        reverse: true,
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
      }
    },
    plugins: {
      legend: {
        position: "top",
        rtl: true,
        reverse: true,
        onClick: null,
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

  return (
    <div
      style={{
        position: "relative",
        height: isFullscreen ? "calc(100vh - 220px)" : "600px"
      }}
    >
      {printMode && (
        <HorizontalBarChartPrint
          printMode={printMode}
          data={data}
          title={title}
        />
      )}
      <Bar options={options} data={data} />
    </div>
  );
};

export default HorizontalBarChart;
