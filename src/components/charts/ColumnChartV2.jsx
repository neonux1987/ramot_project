import React, { useState, useRef } from "react";
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
import {
  setPrintableComponentRef,
  setPrintReady
} from "../../redux/actions/printActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ColumnChartV2 = ({ data, title }) => {
  const ref = useRef();
  const [svg, setSvg] = useState(null);
  const [chartHeight, setChartHeight] = useState("600px");
  const printMode = useSelector((store) => store.print.printMode);
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);
  const dispatch = useDispatch();

  useEffect(() => {
    setChartHeight(isFullscreen ? "70vh" : "600px");
  }, [isFullscreen]);

  const done = (result) => {
    const chart = result.chart;
    const div = document.createElement("div");
    var img = document.createElement("img");
    //chart.resize(1280, 780);
    console.log(chart);
    const dataUrl = result.chart.toBase64Image("image/png", 1);
    //chart.resize();
    img.setAttribute("src", dataUrl);
    // img.height = "100%";
    // img.width = "100%";

    // div.style.justifyContent = "center";
    // div.style.display = "flex";
    // div.style.alignItems = "center";
    // div.style.height = "100%";
    // div.style.width = "100%";
    div.appendChild(img);
    dispatch(setPrintableComponentRef({ current: div }));
    //if (!printMode) dispatch(setPrintReady(true));
  };

  const [options, setOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
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
        display: true,
        text: title,
        color: "#000000",
        font: {
          size: 32
        }
      }
    }
  });

  return (
    <div style={{ position: "relative", height: chartHeight }}>
      <Bar ref={ref} options={options} data={data} />
    </div>
  );
};

export default ColumnChartV2;
