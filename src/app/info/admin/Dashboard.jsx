"use client";

import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import { logout } from "../login/actions";
import { useRouter } from "next/navigation";
import { TabMenu } from "primereact/tabmenu";
import nextDynamic from "next/dynamic";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const GeneralTab = nextDynamic(() => import("../components/generalTab"), {
  loading: () => <p>Loading General Tab...</p>,
});
const TicketsTab = nextDynamic(() => import("../components/ticketsTab"), {
  loading: () => <p>Loading Tickets Tab...</p>,
});
const CouponsTab = nextDynamic(() => import("../components/couponsTab"), {
  loading: () => <p>Loading Coupons Tab...</p>,
});

export const dynamic = "force-dynamic";

export default function Dashboard({
  stats,
  chartData,
  weeklyChartData,
  ordersForGeneralTab,
  currencyData,
  salesStatistics,
  salesTrend,
  ticketStats,
  ticketWeeklyData,
  ticketMonthlyData,
  ticketSalesPieChart,
  getTicketCountDistribution,
  hourlyTicketSalesExpo,
  hourlyTicketSalesConference,
  hourlyTicketSalesWhale,
}) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLogout = async () => {
    const result = await logout();
    if (result?.redirectTo) {
      router.push(result.redirectTo);
    }
  };

  const renderTabContent = () => {
    switch (activeIndex) {
      case 0:
        return (
          <GeneralTab
            stats={stats}
            chartData={chartData}
            weeklyChartData={weeklyChartData}
            ordersForGeneralTab={ordersForGeneralTab}
            currencyData={currencyData}
            salesStatistics={salesStatistics}
            salesTrend={salesTrend}
          />
        );
      case 1:
        return (
          <TicketsTab
            ticketStats={ticketStats}
            ticketWeeklyData={ticketWeeklyData}
            ticketMonthlyData={ticketMonthlyData}
            ticketSalesPieChart={ticketSalesPieChart}
            getTicketCountDistribution={getTicketCountDistribution}
            expoData={hourlyTicketSalesExpo}
            conferenceData={hourlyTicketSalesConference}
            whaleData={hourlyTicketSalesWhale}
          />
        );
      case 2:
        return <CouponsTab />;
      default:
        return null;
    }
  };

  const items = [
    {
      label: "General",
      icon: "pi pi-fw pi-home",
      command: () => setActiveIndex(0),
    },
    {
      label: "Tickets",
      icon: "pi pi-fw pi-ticket",
      command: () => setActiveIndex(1),
    },
    {
      label: "Coupons",
      icon: "pi pi-fw pi-tags",
      command: () => setActiveIndex(2),
    },
  ];

  return (
    <div className="flex p-0 lg:p-6 pt-10 w-full">
      <AdminNavigation onLogout={handleLogout} />

      <div className="flex flex-col items-center justify-center w-full">
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
        <div className="mt-4">{renderTabContent()}</div>
      </div>
    </div>
  );
}
