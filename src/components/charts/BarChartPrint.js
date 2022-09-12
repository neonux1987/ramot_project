import React, { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartPrint = ({ printMode, data, title }) => {
  const ref = useRef();
  const [chartReady, setChartReady] = useState(false);
  const dispatch = useDispatch();

  const done = () => {
    setChartReady(true);
  };

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
    animation: {
      onComplete: done
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
        text: title,
        color: "#000000",
        font: {
          size: 32
        }
      }
    }
  });

  return (
    <div style={{ width: "1280px", height: "780px" }}>
      <Bar ref={ref} options={options} data={data} />
    </div>
  );
};

export default BarChartPrint;
