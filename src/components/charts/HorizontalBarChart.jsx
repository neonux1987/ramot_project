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
import { setPrintableComponentRef } from "../../redux/actions/printActions";
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

const HorizontalBarChart = ({ data, title }) => {
  const ref = useRef();
  const [chartReady, setChartReady] = useState(false);
  const printMode = useSelector((store) => store.print.printMode);
  const isFullscreen = useSelector((store) => store.fullscreen.isFullscreen);
  const dispatch = useDispatch();

  const done = () => {
    setChartReady(true);
  };

  const [options, _] = useState({
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

  /* 
    resize the chart to the desirable print 
  */
  useEffect(() => {
    if (chartReady && printMode) {
      const chart = ref.current;
      const div = document.createElement("div");
      var img = document.createElement("img");

      // enable the title while in print mode
      chart.config._config.options.plugins.title.display = true;
      chart.resize(1280, 780);

      const dataUrl = chart.toBase64Image("image/png", 1);

      // restore to normal
      chart.config._config.options.plugins.title.display = false;
      chart.resize();

      img.setAttribute("src", dataUrl);
      div.appendChild(img);

      dispatch(setPrintableComponentRef({ current: div }));
    }
  }, [chartReady, printMode, dispatch]);

  return (
    <div
      style={{
        position: "relative",
        height: isFullscreen ? "calc(100vh - 220px)" : "600px"
      }}
    >
      <Bar ref={ref} options={options} data={data} />
    </div>
  );
};

export default HorizontalBarChart;
