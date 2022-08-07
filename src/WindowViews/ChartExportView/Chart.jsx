import React, { useEffect, useRef, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({
  index,
  data,
  filePath,
  title,
  setChartDataUrls,
  setChartsDataQueue
}) => {
  const [chartReady, setChartReady] = useState(false);
  const [dataUrl, setDataUrl] = useState(false);
  const ref = useRef();
  const addAndRemove = useRef();

  addAndRemove.current = (dataUrl) => {
    // save data url in the data urls queue
    /* setChartDataUrls((prevData) => {
      const dataClone = [...prevData];
      dataClone.push({
        dataUrl,
        filePath
      });
      return dataClone;
    }); */
    /* // remove the already processed chart data from the queue
    setChartsDataQueue((prevChartsData) => {
      const clonedData = [...prevChartsData];
      clonedData.splice(index, 1);
      return clonedData;
    }); */
  };

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

  useEffect(() => {
    if (chartReady) {
      setChartReady(false);

      const chart = ref.current;

      // get the data url of the chart
      chart.config._config.options.plugins.title.display = true;
      chart.resize(1280, 780);
      const dataUrl = chart.toBase64Image("image/png", 1);

      setDataUrl(dataUrl);
    }
  }, [chartReady]);

  useEffect(() => {
    if (dataUrl !== null) {
      addAndRemove.current(dataUrl);
      setDataUrl(null);
    }
  }, [dataUrl]);

  return <Bar ref={ref} options={options} data={data} />;
};

export default React.memo(Chart);
