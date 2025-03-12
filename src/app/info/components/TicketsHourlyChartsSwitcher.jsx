// app/admin/dashboard/charts/TicketsHourlyChartsSwitcher.jsx
"use client";
import React, { useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import dynamic from "next/dynamic";

const HourlyTicketSalesByTypeBarChart = dynamic(
  () => import("../components/charts/HourlyTicketSalesByTypeBarChart"),
  { ssr: false }
);

export default function TicketsHourlyChartsSwitcher({
  expoData,
  conferenceData,
  whaleData,
}) {
  const [selectedChart, setSelectedChart] = useState("expo");
  const options = [
    { label: "Expo", value: "expo" },
    { label: "Conference", value: "conference" },
    { label: "Whale", value: "whale" },
  ];

  let chartProps;
  if (selectedChart === "expo") {
    chartProps = {
      data: expoData,
      chartLabel: "Expo Pass Orders",
      backgroundColor: "#42A5F5",
    };
  } else if (selectedChart === "conference") {
    chartProps = {
      data: conferenceData,
      chartLabel: "Conference Pass Orders",
      backgroundColor: "#66BB6A",
    };
  } else if (selectedChart === "whale") {
    chartProps = {
      data: whaleData,
      chartLabel: "Whale Pass Orders",
      backgroundColor: "#FFA726",
    };
  }

  return (
    <div>
      <div className="flex justify-center mb-4">
        <SelectButton
          value={selectedChart}
          options={options}
          onChange={(e) => setSelectedChart(e.value)}
        />
      </div>
      <HourlyTicketSalesByTypeBarChart {...chartProps} />
    </div>
  );
}
