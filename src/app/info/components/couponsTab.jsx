import React from "react";
import { priceWithSpaceForAdmin } from "../../../../utils/priceWithSpace";
import CurrencyPieChart from "./charts/CurrencyPieChart";
import DoughnutChart from "./charts/DoughnutChart";

const couponsTab = ({
  couponStats,
  activeCouponsUsage,
  overallCouponsUsage,
}) => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kártya 1: Coupons Used */}
        <div className="bg-white shadow-md p-4 rounded-md min-w-[250px]">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-1">
                Coupons Used
              </span>
              <div className="text-gray-900 font-semibold text-xl">
                {couponStats.couponsUsed}
              </div>
            </div>
            <div className="flex items-center justify-center bg-blue-100 rounded-md w-10 h-10">
              <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {couponStats.couponsUsedToday} new{" "}
          </span>
          <span className="text-gray-500">today</span>
        </div>

        {/* Kártya 2: EUR Discount */}
        <div className="bg-white shadow-md p-4 rounded-md">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-1">
                EUR+BTC Discount
              </span>
              <div className="text-gray-900 font-semibold text-xl">
                {priceWithSpaceForAdmin(couponStats.eurSatsDiscount)}
              </div>
            </div>
            <div className="flex items-center justify-center bg-orange-100 rounded-md w-10 h-10">
              <i className="pi pi-wallet text-orange-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {priceWithSpaceForAdmin(couponStats.eurSatsDiscountToday)}{" "}
          </span>
          <span className="text-gray-500">today</span>
        </div>

        {/* Kártya 3: HUF Discount */}
        <div className="bg-white shadow-md p-4 rounded-md">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-1">
                HUF Discount
              </span>
              <div className="text-gray-900 font-semibold text-xl">
                {priceWithSpaceForAdmin(couponStats.hufDiscount)}
              </div>
            </div>
            <div className="flex items-center justify-center bg-cyan-100 rounded-md w-10 h-10">
              <i className="pi pi-money-bill text-cyan-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {priceWithSpaceForAdmin(couponStats.hufDiscountToday)}{" "}
          </span>
          <span className="text-gray-500">today</span>
        </div>

        {/* Kártya 4: Active/Inactive Coupons */}
        <div className="bg-white shadow-md p-4 rounded-md">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-500 font-medium mb-1">
                Active Coupons
              </span>
              <div className="text-gray-900 font-semibold text-xl">
                {couponStats.activeCoupons}
              </div>
            </div>
            <div className="flex items-center justify-center bg-purple-100 rounded-md w-10 h-10">
              <i className="pi pi-chart-line text-purple-500 text-xl"></i>
            </div>
          </div>
          <span className="text-red-500 font-medium">
            {couponStats.inactiveCoupons}{" "}
          </span>
          <span className="text-gray-500">inactive</span>
        </div>
      </div>

      {/* <div className="mt-6">
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
      </div> */}

      <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-0 items-center lg:justify-between mt-10 lg:p-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-center">Active coupons used</h3>
          <CurrencyPieChart currencyData={activeCouponsUsage} />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-center">Overall coupon usage</h3>
          <DoughnutChart currencyData={overallCouponsUsage} />
        </div>
      </div>

      {/* <div className="mt-6">
        <h3 className="text-gray-700 text-lg mb-4">
          Hourly Ticket Sales by Type
        </h3>
        <TicketsHourlyChartsSwitcher
          expoData={expoData}
          conferenceData={conferenceData}
          whaleData={whaleData}
        />
      </div> */}
    </div>
  );
};

export default couponsTab;
