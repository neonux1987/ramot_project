import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const DonutChart = (props) => {
  return (
    <div style={{ width: "155px", height: "165px", marginBottom: "5px" }}>
      <Doughnut
        data={props.data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default DonutChart;
