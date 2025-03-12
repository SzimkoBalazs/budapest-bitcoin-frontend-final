// app/admin/dashboard/charts/HourlyTicketSalesBarChart.jsx
"use client";
import React from "react";
import { Chart } from "primereact/chart";

export default function HourlyTicketSalesByTypeBarChart({
  data,
  chartLabel,
  backgroundColor,
}) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: chartLabel,
        data: data.data,
        backgroundColor: backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: {
      x: { title: { display: true, text: "Hour of Day" } },
      y: { title: { display: true, text: "Order Count" } },
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
