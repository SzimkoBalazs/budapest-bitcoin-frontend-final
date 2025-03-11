"use client";
import React, { useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import dynamic from "next/dynamic";

const WeeklyTicketSalesLineChart = dynamic(
  () => import("./charts/WeeklyTicketSalesLineChart"),
  { ssr: false }
);
const HourlyTicketSalesBarChart = dynamic(
  () => import("../components/charts/HourlyTicketSalesBarChart"),
  { ssr: false }
);

export default function SalesTrendsChartSwitcher({
  salesStatistics,
  salesTrend,
}) {
  const [selectedChart, setSelectedChart] = useState("monthly");
  const options = [
    { label: "Weekly Sales", value: "weekly" },
    { label: "Hourly Sales", value: "hourly" },
  ];

  return (
    <div>
      <div className="flex justify-center mb-4">
        <SelectButton
          value={selectedChart}
          options={options}
          onChange={(e) => setSelectedChart(e.value)}
        />
      </div>
      {selectedChart === "weekly" ? (
        <WeeklyTicketSalesLineChart data={salesTrend} />
      ) : (
        <HourlyTicketSalesBarChart data={salesStatistics} />
      )}
    </div>
  );
}
