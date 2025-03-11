"use client";
import React, { useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import GeneralTabStackedMonthlyChart from "./charts/GeneralTabStackedMonthlyChart";
import CurrencyPieChart from "./charts/CurrencyPieChart";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DoughnutChart from "./charts/DoughnutChart";

const ticketsTab = ({
  ticketStats,
  ticketWeeklyData,
  ticketMonthlyData,
  ticketSalesPieChart,
  getTicketCountDistribution,
}) => {
  const [selectedChart, setSelectedChart] = useState("monthly");
  const options = [
    { label: "Monthly", value: "monthly" },
    { label: "Weekly", value: "weekly" },
  ];
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* 4 oszlopos grid nagyobb kijelzőn, 2 oszlop közepesnél, 1 oszlop mobilon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kártya 1 */}
        <div className="bg-white shadow-md p-4 rounded-md min-w-[250px]">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-1">
                Tickets Sold
              </span>
              <div className="text-gray-900 font-semibold text-xl">
                {ticketStats.overall.total}
              </div>
            </div>
            <div className="flex items-center justify-center bg-blue-100 rounded-md w-10 h-10">
              <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {ticketStats.overall.today} new{" "}
          </span>
          <span className="text-gray-500">today</span>
        </div>

        {/* Kártya 2 */}
        <div className="bg-white shadow-md p-4 rounded-md">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-1">
                Expo Pass
              </span>
              <div className="text-gray-900 font-semibold text-xl">
                {ticketStats.expo.total}
              </div>
            </div>
            <div className="flex items-center justify-center bg-orange-100 rounded-md w-10 h-10">
              <i className="pi pi-wallet text-orange-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {ticketStats.expo.today}{" "}
          </span>
          <span className="text-gray-500">today</span>
        </div>

        {/* Kártya 3 */}
        <div className="bg-white shadow-md p-4 rounded-md">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-1">
                Conference Pass
              </span>
              <div className="text-gray-900 font-semibold text-xl">
                {ticketStats.conference.total}
              </div>
            </div>
            <div className="flex items-center justify-center bg-cyan-100 rounded-md w-10 h-10">
              <i className="pi pi-money-bill text-cyan-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {ticketStats.conference.today}{" "}
          </span>
          <span className="text-gray-500">today</span>
        </div>

        {/* Kártya 4 */}
        <div className="bg-white shadow-md p-4 rounded-md">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-1">
                Whale Pass
              </span>
              <div className="text-gray-900 font-semibold text-xl">
                {ticketStats.whale.total}
              </div>
            </div>
            <div className="flex items-center justify-center bg-purple-100 rounded-md w-10 h-10">
              <i className="pi pi-chart-line text-purple-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {ticketStats.whale.today}{" "}
          </span>
          <span className="text-gray-500">today</span>
        </div>
      </div>

      {/* Itt lesznek a grafikonok később */}
      <div className="mt-6">
        <h3 className="text-gray-700 text-lg mb-4 lg:mb-0">
          Ticket Sales Comparison
        </h3>
        <div className="flex justify-center mb-4">
          <SelectButton
            value={selectedChart}
            options={options}
            onChange={(e) => setSelectedChart(e.value)}
          />
        </div>
        {selectedChart === "monthly" ? (
          <GeneralTabStackedMonthlyChart data={ticketMonthlyData} />
        ) : (
          <GeneralTabStackedMonthlyChart data={ticketWeeklyData} />
        )}
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-0 items-center lg:justify-between mt-10 lg:p-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-center">Ticket types sold</h3>
          <CurrencyPieChart currencyData={ticketSalesPieChart} />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-center">Ticket's count in one order</h3>
          <DoughnutChart currencyData={getTicketCountDistribution} />
        </div>
      </div>

      {/* <div className="mt-6">
        <SalesTrendsChartSwitcher
          salesStatistics={salesStatistics}
          salesTrend={salesTrend}
        />
      </div> */}
    </div>
  );
};

export default ticketsTab;
