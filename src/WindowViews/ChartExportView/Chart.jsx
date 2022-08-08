import React, { useEffect, useState } from "react";
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
import { drawBackground } from "./plugins";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ index, data, onFinished, title }) => {
  const [finished, setFinished] = useState(false);
  const done = ({ chart }) => {
    if (!finished) {
      const dataUrl = chart.toBase64Image("image/png", 1);
      onFinished({ index, dataUrl });
      setFinished(true);
    }
  };

  const [options] = useState({
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    layout: {
      padding: {
        left: 30,
        right: 30,
        top: 40,
        bottom: 80
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
    animation: {
      onComplete: done,
      duration: 0
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
        display: true,
        text: title,
        color: "#000000",
        font: {
          size: 32
        }
      }
    }
  });

  useEffect(() => {}, [finished]);

  if (!finished)
    return <Bar options={options} data={data} plugins={[drawBackground]} />;

  return null;
};

export default React.memo(Chart);
