"use client";
import React from "react";
import { Chart } from "primereact/chart";

export default function HourlyTicketSalesBarChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Orders",
        data: data.data,
        backgroundColor: "#66BB6A",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: {
      x: { title: { display: true, text: "Hour of Day" } },
      y: {
        title: { display: true, text: "Order count" },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Chart
        type="bar"
        data={chartData}
        options={options}
        className="min-h-[400px]"
      />
    </div>
  );
}
