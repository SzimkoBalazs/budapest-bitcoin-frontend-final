"use client";
import React from "react";
import { Chart } from "primereact/chart";

export default function WeeklySalesLineChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Tickets Sold (Weekly)",
        data: data.data,
        borderColor: "#42A5F5",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Chart
        type="line"
        data={chartData}
        options={options}
        className="min-h-[400px]"
      />
    </div>
  );
}
