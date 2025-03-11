"use client";

import React from "react";
import { Chart } from "primereact/chart";

export default function CurrencyPieChart({ currencyData }) {
  const chartData = {
    labels: currencyData.labels,
    datasets: [
      {
        data: currencyData.data,
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"], // Tetszés szerinti színek
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ne kényszerítse 1:1 arányba
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Chart type="pie" data={chartData} options={options} />
    </div>
  );
}
