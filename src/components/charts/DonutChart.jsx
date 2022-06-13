import React from "react";
import Chart from "./Chart";

const DonutChart = (props) => {
  return (
    <Chart
      options={{
        credits: {
          enabled: false,
        },
        chart: {
          type: "pie",
          width: 170,
          height: 170,
          backgroundColor: "transparent",
        },
        exporting: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            innerSize: "70%",
            borderWidth: 10,
            borderRadius: 10,
            borderColor: "#fff",
            dataLabels: {
              enabled: false,
            },
            fillColor: "#ffffff",
            showInLegend: false,
            enableMouseTracking: false,
            size: 160,
          },
        },
        title: {
          text: "",
        },
        series: props.series,
        tooltip: {
          enabled: false,
        },
      }}
    />
  );
};

export default DonutChart;
