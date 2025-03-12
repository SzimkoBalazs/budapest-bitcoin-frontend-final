import { getAdminInfo, getOrdersForGeneralTab } from "@/app/actions/adminInfo";
import { getMonthlySalesData } from "@/app/actions/adminInfo";
import { getWeeklySalesData } from "@/app/actions/adminInfo";
import { getPaidOrderCurrencyDistribution } from "@/app/actions/adminInfo";
import {
  getHourlySalesStatistics,
  getWeeklySalesTrend,
  getTicketsSalesStatistics,
  getMonthlyTicketSalesByType,
  getWeeklyTicketSalesByType,
  getTicketSalesByTypeForPieChart,
  getOrderTicketCountDistribution,
} from "@/app/actions/adminInfo";
import {
  getHourlyTicketSalesExpo,
  getHourlyTicketSalesConference,
  getHourlyTicketSalesWhale,
} from "@/app/actions/getHourlyTicketSales";
import Dashboard from "./Dashboard";

export default async function DashboardPage() {
  // Szerver oldalon, SSR-kor meghívjuk a server actiont
  const stats = await getAdminInfo();
  const chartData = await getMonthlySalesData();
  const weeklyChartData = await getWeeklySalesData();
  const ordersForGeneralTab = await getOrdersForGeneralTab();
  const currencyData = await getPaidOrderCurrencyDistribution();
  const salesStatistics = await getHourlySalesStatistics();
  const salesTrend = await getWeeklySalesTrend();
  const ticketStats = await getTicketsSalesStatistics();
  const weeklyTicketSalesStackedChartData = await getWeeklyTicketSalesByType();
  const monthlyTicketSalesStackedChartData =
    await getMonthlyTicketSalesByType();
  const ticketSalesPieChart = await getTicketSalesByTypeForPieChart();
  const getTicketCountDistribution = await getOrderTicketCountDistribution();
  const hourlyTicketSalesExpo = await getHourlyTicketSalesExpo();
  const hourlyTicketSalesConference = await getHourlyTicketSalesConference();
  const hourlyTicketSalesWhale = await getHourlyTicketSalesWhale();

  console.log("currency data:", currencyData);

  // Az adatot propként átadjuk a kliens komponensnek
  return (
    <Dashboard
      stats={stats}
      chartData={chartData}
      weeklyChartData={weeklyChartData}
      ordersForGeneralTab={ordersForGeneralTab}
      currencyData={currencyData}
      salesStatistics={salesStatistics}
      salesTrend={salesTrend}
      ticketStats={ticketStats}
      ticketWeeklyData={weeklyTicketSalesStackedChartData}
      ticketMonthlyData={monthlyTicketSalesStackedChartData}
      ticketSalesPieChart={ticketSalesPieChart}
      getTicketCountDistribution={getTicketCountDistribution}
      hourlyTicketSalesExpo={hourlyTicketSalesExpo}
      hourlyTicketSalesConference={hourlyTicketSalesConference}
      hourlyTicketSalesWhale={hourlyTicketSalesWhale}
    />
  );
}
