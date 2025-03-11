"use client";
import React from "react";
import { Chart } from "primereact/chart";

const generalTabStackedMonthlyChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      tooltip: { mode: "index", intersect: false },
      legend: { labels: { color: "#495057" } },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: "#495057" },
        grid: { color: "#ebedef" },
      },
      y: {
        stacked: true,
        ticks: { color: "#495057" },
        grid: { color: "#ebedef" },
      },
    },
  };

  return <Chart type="bar" data={data} options={options} />;
};

export default generalTabStackedMonthlyChart;
