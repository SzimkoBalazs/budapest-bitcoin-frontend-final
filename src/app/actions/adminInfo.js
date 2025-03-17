"use server";
import prisma from "../../../utils/db";
import { OrderStatus, PaymentProvider, Currency } from "@prisma/client";

export async function getAdminInfo() {
  // Teszt dátum: 2025. január 1.
  // const referenceDate = new Date("2025-01-01T00:00:00.000Z");
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");

  // Az aktuális nap kezdete (helyi idő szerinti éjfél)
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // 1) Összes PAID státuszú rendelés a referenceDate óta
  const totalPaidCount = await prisma.order.count({
    where: {
      status: OrderStatus.PAID,
      createdAt: { gte: referenceDate },
    },
  });

  // 2) Hány új (PAID) rendelés van ma (az aktuális nap kezdetétől)
  const newTodayCount = await prisma.order.count({
    where: {
      status: OrderStatus.PAID,
      createdAt: { gte: todayStart },
    },
  });

  // Segédfüggvény: összegzés finalAmountInCents mezőre
  async function sumFinalAmounts(provider, currency, fromDate) {
    const result = await prisma.order.aggregate({
      where: {
        status: OrderStatus.PAID,
        createdAt: { gte: fromDate },
        paymentProvider: provider,
        currency: currency,
      },
      _sum: {
        finalAmountInCents: true,
      },
    });
    return result._sum.finalAmountInCents || 0;
  }

  // 3) STRIPE + EUR
  const stripeEurTotal = await sumFinalAmounts(
    PaymentProvider.STRIPE,
    Currency.EUR,
    referenceDate
  );
  const stripeEurToday = await sumFinalAmounts(
    PaymentProvider.STRIPE,
    Currency.EUR,
    todayStart
  );

  // 4) STRIPE + HUF
  const stripeHufTotal = await sumFinalAmounts(
    PaymentProvider.STRIPE,
    Currency.HUF,
    referenceDate
  );
  const stripeHufToday = await sumFinalAmounts(
    PaymentProvider.STRIPE,
    Currency.HUF,
    todayStart
  );

  // 5) BTCPAY + EUR
  const btcPaySatsTotal = await sumFinalAmounts(
    PaymentProvider.BTCPAY,
    Currency.SATS,
    referenceDate
  );
  const btcPaySatsToday = await sumFinalAmounts(
    PaymentProvider.BTCPAY,
    Currency.SATS,
    todayStart
  );

  // Visszaadjuk az összegyűjtött adatokat
  return {
    totalPaidCount,
    newTodayCount,
    stripeEurTotal,
    stripeEurToday,
    stripeHufTotal,
    stripeHufToday,
    btcPaySatsTotal,
    btcPaySatsToday,
  };
}

//generalTab monthly chart

export async function getMonthlySalesData() {
  // Állítsd be a referencia dátumot (például a releváns kezdő dátumot)
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");
  // const referenceDate = new Date("2025-01-01T00:00:00.000Z");

  // Lekérjük az összes PAID rendelést a referenceDate óta
  const orders = await prisma.order.findMany({
    where: {
      status: OrderStatus.PAID,
      createdAt: { gte: referenceDate },
    },
    select: {
      createdAt: true,
      totalAmountInCents: true,
      discountInCents: true,
      finalAmountInCents: true,
      currency: true,
    },
  });

  // Csoportosítjuk hónapokra (YYYY-MM formátumban)
  const monthlyData = {};
  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const monthLabel =
      date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
    if (!monthlyData[monthLabel]) {
      monthlyData[monthLabel] = { EUR: 0, HUF: 0, BTC: 0 };
    }

    if (order.currency === "EUR") {
      // EUR esetében: finalAmountInCents / 100
      monthlyData[monthLabel].EUR += order.finalAmountInCents / 100;
    } else if (order.currency === "HUF") {
      // HUF esetében: (finalAmountInCents / 100) osztva 400-al
      monthlyData[monthLabel].HUF += order.finalAmountInCents / 100 / 400;
    } else if (order.currency === "SATS") {
      // BTC esetében: a final összeget számoljuk a totalAmountInCents és discountInCents alapján (EUR érték)
      const discount = order.discountInCents || 0;
      monthlyData[monthLabel].BTC +=
        (order.totalAmountInCents - discount) / 100;
    }
  });

  // Rendezett hónap címkék
  const labels = Object.keys(monthlyData).sort();

  // Adatok az egyes pénznemekhez
  const eurData = labels.map((label) => monthlyData[label].EUR);
  const hufData = labels.map((label) => monthlyData[label].HUF);
  const btcData = labels.map((label) => monthlyData[label].BTC);

  return {
    labels,
    datasets: [
      { label: "EUR", backgroundColor: "#42A5F5", data: eurData },
      { label: "HUF", backgroundColor: "#66BB6A", data: hufData },
      { label: "BTC", backgroundColor: "#FFA726", data: btcData },
    ],
  };
}

//generaltTab weekly chart

function getWeekLabel(date) {
  // Kiszámoljuk az ISO hét számot (UTC alapján)
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // Ha a hét első napja vasárnap, azt 7-ként kezeljük
  const dayNum = d.getUTCDay() || 7;
  // Állítsuk be, hogy a dátum a hét közepére essen (közelítőleg csütörtök)
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const year = d.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  // Számoljuk ki a hét sorszámát
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${year}-W${String(weekNo).padStart(2, "0")}`;
}

export async function getWeeklySalesData() {
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");
  // const referenceDate = new Date("2025-01-01T00:00:00.000Z");

  const orders = await prisma.order.findMany({
    where: {
      status: OrderStatus.PAID,
      createdAt: { gte: referenceDate },
    },
    select: {
      createdAt: true,
      totalAmountInCents: true,
      discountInCents: true,
      finalAmountInCents: true,
      currency: true,
    },
  });

  // Csoportosítjuk a rendeléseket hét label szerint
  const weeklyData = {};
  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const weekLabel = getWeekLabel(date);
    if (!weeklyData[weekLabel]) {
      weeklyData[weekLabel] = { EUR: 0, HUF: 0, BTC: 0 };
    }

    if (order.currency === "EUR") {
      // EUR: finalAmountInCents átszámolva euróra
      weeklyData[weekLabel].EUR += order.finalAmountInCents / 100;
    } else if (order.currency === "HUF") {
      // HUF: finalAmountInCents centből, majd 400-al osztva
      weeklyData[weekLabel].HUF += order.finalAmountInCents / 100 / 400;
    } else if (order.currency === "SATS") {
      // BTC: a totalAmountInCents és discountInCents alapján
      const discount = order.discountInCents || 0;
      weeklyData[weekLabel].BTC += (order.totalAmountInCents - discount) / 100;
    }
  });

  // A hétcímkék rendezett listája
  const labels = Object.keys(weeklyData).sort();

  // A három pénznemhez létrehozzuk az adatokat a címkék sorrendjében
  const eurData = labels.map((label) => weeklyData[label].EUR);
  const hufData = labels.map((label) => weeklyData[label].HUF);
  const btcData = labels.map((label) => weeklyData[label].BTC);

  return {
    labels,
    datasets: [
      { label: "EUR", backgroundColor: "#42A5F5", data: eurData },
      { label: "HUF", backgroundColor: "#66BB6A", data: hufData },
      { label: "BTC", backgroundColor: "#FFA726", data: btcData },
    ],
  };
}

//get orders for general tab

export async function getOrdersForGeneralTab() {
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");
  const orders = await prisma.order.findMany({
    where: { status: OrderStatus.PAID, createdAt: { gte: referenceDate } },
    orderBy: { createdAt: "desc" },
    include: {
      coupon: true,
      items: {
        include: {
          ticket: true,
        },
      },
    },
  });
  return orders;
}

//orders chart distributed by currency

export async function getPaidOrderCurrencyDistribution() {
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");
  // Megszámoljuk a PAID státuszú rendelések számát pénznemenként
  const eurCount = await prisma.order.count({
    where: {
      status: OrderStatus.PAID,
      currency: "EUR",
      createdAt: { gte: referenceDate },
    },
  });

  const hufCount = await prisma.order.count({
    where: {
      status: OrderStatus.PAID,
      currency: "HUF",
      createdAt: { gte: referenceDate },
    },
  });

  const satsCount = await prisma.order.count({
    where: {
      status: OrderStatus.PAID,
      currency: "SATS",
      createdAt: { gte: referenceDate },
    },
  });

  // Visszaadjuk a chart számára megfelelő struktúrában
  return {
    labels: ["EUR", "HUF", "BTC"],
    data: [eurCount, hufCount, satsCount],
  };
}

//generaltab monthly sales trend linechart

export async function getWeeklySalesTrend() {
  // const referenceDate = new Date("2025-01-01T00:00:00.000Z");
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");

  // Lekérjük a PAID rendeléseket a referencia dátumtól, beépítve az order itemeket
  const orders = await prisma.order.findMany({
    where: {
      status: OrderStatus.PAID,
      createdAt: { gte: referenceDate },
    },
    include: { items: true },
  });

  // Heti csoportosításhoz szükséges segédfüggvény (ISO hét)
  function getWeekLabel(date) {
    // Klónozzuk a dátumot, hogy ne módosítsuk az eredetit
    const d = new Date(date.valueOf());
    // Az UTC-n alapuló számítás miatt normalizáljuk
    const dayNum = d.getUTCDay() || 7; // Ha vasárnap, akkor 7
    // Eltoljuk úgy, hogy csütörtök legyen a hét "közepe"
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const year = d.getUTCFullYear();
    // Az év első napja (UTC)
    const yearStart = new Date(Date.UTC(year, 0, 1));
    // Hány nap telt el az év eleje óta
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Formátum: 2025-W03
    return `${year}-W${String(weekNo).padStart(2, "0")}`;
  }

  // Ebben a változóban tároljuk heti bontásban a jegyeladásokat
  const weeklyData = {};

  // Minden rendelésnél megnézzük, melyik hétre esik
  orders.forEach((order) => {
    const weekLabel = getWeekLabel(order.createdAt);
    if (!weeklyData[weekLabel]) {
      weeklyData[weekLabel] = 0;
    }
    // Hozzáadjuk az order itemek mennyiségét
    order.items.forEach((item) => {
      weeklyData[weekLabel] += item.quantity;
    });
  });

  // Rendezett heti címkék
  const labels = Object.keys(weeklyData).sort();
  // A labels sorrendjében összeállítjuk az adatsort
  const data = labels.map((label) => weeklyData[label]);

  return { labels, data };
}

//generalTab hourly sales statistics

export async function getHourlySalesStatistics() {
  // Ez a dátum a referencia idő, ahonnan nézzük a rendelések óránkénti eloszlását
  // const referenceDate = new Date("2025-01-01T00:00:00.000Z");
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");

  // Lekérjük az összes PAID státuszú rendelést a referenceDate óta
  const orders = await prisma.order.findMany({
    where: {
      status: OrderStatus.PAID,
      createdAt: { gte: referenceDate },
    },
    // Itt nem is kell feltétlenül include: { items: true },
    // mert most csak a rendelések számát számoljuk, nem a jegyek mennyiségét.
  });

  // Létrehozunk egy 24 elemből álló tömböt (0-23 óra), mindet 0-ra állítva
  const hourlyData = Array(24).fill(0);

  // Végigmegyünk minden rendelésen, és megnöveljük a megfelelő óra számlálóját
  orders.forEach((order) => {
    const hour = new Date(order.createdAt).getHours();
    hourlyData[hour] += 1;
  });

  // A chart-hoz 0..23 címkéket készítünk
  const labels = Array.from({ length: 24 }, (_, i) => i.toString());

  // Így a data tömb indexe jelzi az órát, értéke pedig a rendelések számát
  return { labels, data: hourlyData };
}

//ticketTab general ticket sales

export async function getTicketsSalesStatistics() {
  // Definiáljuk a referencia dátumot: a régebbi rendelések nem számítanak
  //
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");
  // Ma elejét számoljuk ki
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // Lekérjük az összes PAID rendeléshez tartozó order itemet,
  // de csak azokat, ahol a rendelés createdAt a referencia dátum után van.
  const orderItems = await prisma.orderItem.findMany({
    where: {
      order: {
        status: OrderStatus.PAID,
        createdAt: { gte: referenceDate },
      },
    },
    include: {
      ticket: true,
      order: true,
    },
  });

  let overallSold = 0;
  let overallSoldToday = 0;
  let expoSold = 0;
  let expoSoldToday = 0;
  let conferenceSold = 0;
  let conferenceSoldToday = 0;
  let whaleSold = 0;
  let whaleSoldToday = 0;

  orderItems.forEach((item) => {
    const orderCreatedAt = new Date(item.order.createdAt);
    overallSold += item.quantity;
    if (orderCreatedAt >= todayStart) {
      overallSoldToday += item.quantity;
    }

    // Használjuk a ticket név kisbetűs változatát az összehasonlításhoz
    const ticketName = item.ticket.name.toLowerCase();
    if (ticketName.includes("expo pass")) {
      expoSold += item.quantity;
      if (orderCreatedAt >= todayStart) {
        expoSoldToday += item.quantity;
      }
    }
    if (ticketName.includes("conference pass")) {
      conferenceSold += item.quantity;
      if (orderCreatedAt >= todayStart) {
        conferenceSoldToday += item.quantity;
      }
    }
    if (ticketName.includes("whale pass")) {
      whaleSold += item.quantity;
      if (orderCreatedAt >= todayStart) {
        whaleSoldToday += item.quantity;
      }
    }
  });

  return {
    overall: { total: overallSold, today: overallSoldToday },
    expo: { total: expoSold, today: expoSoldToday },
    conference: { total: conferenceSold, today: conferenceSoldToday },
    whale: { total: whaleSold, today: whaleSoldToday },
  };
}

//ticketsTab weekly and monthly stacked barchart data

export async function getMonthlyTicketSalesByType() {
  // const referenceDate = new Date("2025-03-05T16:00:00.000Z");
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");
  // Csak a referencia dátum utáni PAID rendeléseket kérjük le az OrderItem-ekkel
  const orderItems = await prisma.orderItem.findMany({
    where: {
      order: {
        status: OrderStatus.PAID,
        createdAt: { gte: referenceDate },
      },
    },
    include: {
      ticket: true,
      order: true,
    },
  });

  // Havi csoportosítás: kulcs = "YYYY-MM"
  const monthlyData = {};

  orderItems.forEach((item) => {
    const date = new Date(item.order.createdAt);
    const monthLabel = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    if (!monthlyData[monthLabel]) {
      monthlyData[monthLabel] = { expo: 0, conference: 0, whale: 0 };
    }
    const ticketName = item.ticket.name.toLowerCase();
    if (ticketName.includes("expo pass")) {
      monthlyData[monthLabel].expo += item.quantity;
    } else if (ticketName.includes("conference pass")) {
      monthlyData[monthLabel].conference += item.quantity;
    } else if (ticketName.includes("whale pass")) {
      monthlyData[monthLabel].whale += item.quantity;
    }
  });

  const labels = Object.keys(monthlyData).sort();
  const expoData = labels.map((label) => monthlyData[label].expo);
  const conferenceData = labels.map((label) => monthlyData[label].conference);
  const whaleData = labels.map((label) => monthlyData[label].whale);

  return {
    labels,
    datasets: [
      { label: "Expo Pass", data: expoData, backgroundColor: "#42A5F5" },
      {
        label: "Conference Pass",
        data: conferenceData,
        backgroundColor: "#66BB6A",
      },
      { label: "Whale Pass", data: whaleData, backgroundColor: "#FFA726" },
    ],
  };
}

function getWeeksLabel(date) {
  // ISO hét számítás
  const d = new Date(date.valueOf());
  const dayNum = d.getUTCDay() || 7; // vasárnap 7-ként
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const year = d.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${year}-W${String(weekNo).padStart(2, "0")}`;
}

export async function getWeeklyTicketSalesByType() {
  // const referenceDate = new Date("2025-01-01T00:00:00.000Z");
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");

  const orderItems = await prisma.orderItem.findMany({
    where: {
      order: {
        status: OrderStatus.PAID,
        createdAt: { gte: referenceDate },
      },
    },
    include: {
      ticket: true,
      order: true,
    },
  });

  // Heti csoportosítás: kulcs = "YYYY-WXX"
  const weeklyData = {};

  orderItems.forEach((item) => {
    const weekLabel = getWeeksLabel(item.order.createdAt);
    if (!weeklyData[weekLabel]) {
      weeklyData[weekLabel] = { expo: 0, conference: 0, whale: 0 };
    }
    const ticketName = item.ticket.name.toLowerCase();
    if (ticketName.includes("expo pass")) {
      weeklyData[weekLabel].expo += item.quantity;
    } else if (ticketName.includes("conference pass")) {
      weeklyData[weekLabel].conference += item.quantity;
    } else if (ticketName.includes("whale pass")) {
      weeklyData[weekLabel].whale += item.quantity;
    }
  });

  const labels = Object.keys(weeklyData).sort();
  const expoData = labels.map((label) => weeklyData[label].expo);
  const conferenceData = labels.map((label) => weeklyData[label].conference);
  const whaleData = labels.map((label) => weeklyData[label].whale);

  return {
    labels,
    datasets: [
      { label: "Expo Pass", data: expoData, backgroundColor: "#42A5F5" },
      {
        label: "Conference Pass",
        data: conferenceData,
        backgroundColor: "#66BB6A",
      },
      { label: "Whale Pass", data: whaleData, backgroundColor: "#FFA726" },
    ],
  };
}

export async function getTicketSalesByTypeForPieChart() {
  // const referenceDate = new Date("2025-01-01T00:00:00.000Z");
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");

  // Lekérjük a PAID rendeléseket a referencia dátumtól, OrderItem-ekkel
  const orderItems = await prisma.orderItem.findMany({
    where: {
      order: {
        status: OrderStatus.PAID,
        createdAt: { gte: referenceDate },
      },
    },
    include: {
      ticket: true,
    },
  });

  let expoSold = 0;
  let conferenceSold = 0;
  let whaleSold = 0;

  orderItems.forEach((item) => {
    // Ticket név kisbetűs változatával hasonlítunk
    const ticketName = item.ticket.name.toLowerCase();
    if (ticketName.includes("expo pass")) {
      expoSold += item.quantity;
    } else if (ticketName.includes("conference pass")) {
      conferenceSold += item.quantity;
    } else if (ticketName.includes("whale pass")) {
      whaleSold += item.quantity;
    }
  });

  return {
    labels: ["Expo Pass", "Conference Pass", "Whale Pass"],
    data: [expoSold, conferenceSold, whaleSold],
  };
}

export async function getOrderTicketCountDistribution() {
  // const referenceDate = new Date("2025-01-01T00:00:00.000Z");
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");
  // Lekérjük a PAID rendeléseket a referencia dátumtól, OrderItem-ekkel
  const orders = await prisma.order.findMany({
    where: {
      status: OrderStatus.PAID,
      createdAt: { gte: referenceDate },
    },
    include: {
      items: true,
    },
  });

  let count1 = 0;
  let count2 = 0;
  let count3plus = 0;

  orders.forEach((order) => {
    // Összegyűjtjük az OrderItem-ek mennyiségét az adott rendelésben
    const totalTickets = order.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    if (totalTickets === 1) {
      count1 += 1;
    } else if (totalTickets === 2) {
      count2 += 1;
    } else if (totalTickets >= 3) {
      count3plus += 1;
    }
  });

  return {
    labels: ["1 ticket", "2 tickets", "3+ tickets"],
    data: [count1, count2, count3plus],
  };
}

// ticket sales hourly by tickettype

export async function getHourlyTicketSalesByType(ticketTypeKeyword) {
  // const referenceDate = new Date("2025-01-01T00:00:00.000Z");
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");

  const orderItems = await prisma.orderItem.findMany({
    where: {
      order: {
        status: OrderStatus.PAID,
        createdAt: { gte: referenceDate },
      },
      ticket: {
        name: {
          contains: ticketTypeKeyword,
        },
      },
    },
    include: { order: true },
  });

  const hourlyData = Array(24).fill(0);
  orderItems.forEach((item) => {
    const hour = new Date(item.order.createdAt).getHours();
    hourlyData[hour] += item.quantity;
  });
  const labels = Array.from({ length: 24 }, (_, i) => i.toString());
  return { labels, data: hourlyData };
}

export async function getCouponsStatistics() {
  // Referencia dátum: a régebbi rendelések nem számítanak
  // const referenceDate = new Date("2025-01-01T00:00:00.000Z");
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");
  // Ma elejét számoljuk ki
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // 1. Összes kupon felhasználás: az összes coupon.usedRedemptions összege
  const couponAgg = await prisma.coupon.aggregate({
    where: {
      createdAt: { gte: referenceDate },
    },
    _sum: { usedRedemptions: true },
  });
  const couponsUsed = couponAgg._sum.usedRedemptions || 0;

  // 2. Kupon felhasználás "today": hány PAID rendelésnél volt kupon, a mai nap óta
  const couponsUsedToday = await prisma.order.count({
    where: {
      status: OrderStatus.PAID,
      createdAt: { gte: todayStart },
      couponId: { not: null },
    },
  });

  // 3. EUR Discount: PAID rendeléseknél, ahol a currency EUR, discountInCents összege
  const eurSatsAgg = await prisma.order.aggregate({
    where: {
      status: OrderStatus.PAID,
      currency: { in: ["EUR", "SATS"] },
      discountInCents: { not: null },
      createdAt: { gte: referenceDate },
    },
    _sum: { discountInCents: true },
  });
  const eurSatsDiscount = (eurSatsAgg._sum.discountInCents || 0) / 100;
  const eurSatsAggToday = await prisma.order.aggregate({
    where: {
      status: OrderStatus.PAID,
      currency: { in: ["EUR", "SATS"] },
      discountInCents: { not: null },
      createdAt: { gte: todayStart },
    },
    _sum: { discountInCents: true },
  });
  const eurSatsDiscountToday =
    (eurSatsAggToday._sum.discountInCents || 0) / 100;

  // 4. HUF Discount: ugyanígy a HUF rendeléseknél
  const hufAgg = await prisma.order.aggregate({
    where: {
      status: OrderStatus.PAID,
      currency: "HUF",
      discountInCents: { not: null },
      createdAt: { gte: referenceDate },
    },
    _sum: { discountInCents: true },
  });
  const hufDiscount = (hufAgg._sum.discountInCents || 0) / 100;
  const hufAggToday = await prisma.order.aggregate({
    where: {
      status: OrderStatus.PAID,
      currency: "HUF",
      discountInCents: { not: null },
      createdAt: { gte: todayStart },
    },
    _sum: { discountInCents: true },
  });
  const hufDiscountToday = (hufAggToday._sum.discountInCents || 0) / 100;

  // 5. Active és inaktív kuponok
  const activeCoupons = await prisma.coupon.count({
    where: { isActive: true },
  });
  const inactiveCoupons = await prisma.coupon.count({
    where: { isActive: false },
  });

  return {
    couponsUsed,
    couponsUsedToday,
    eurSatsDiscount,
    eurSatsDiscountToday,
    hufDiscount,
    hufDiscountToday,
    activeCoupons,
    inactiveCoupons,
  };
}

//coupon usage for doughnutcharts

export async function getActiveCouponsUsage() {
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");

  const activeCoupons = await prisma.coupon.findMany({
    where: { isActive: true, createdAt: { gte: referenceDate } },
    select: { code: true, usedRedemptions: true },
  });

  const labels = activeCoupons.map((coupon) => coupon.code);
  const data = activeCoupons.map((coupon) => coupon.usedRedemptions || 0);

  return { labels, data };
}

export async function getAllCouponsUsage() {
  const referenceDate = new Date("2025-03-05T16:00:00.000Z");
  const coupons = await prisma.coupon.findMany({
    where: { createdAt: { gte: referenceDate } },
    select: {
      code: true,
      usedRedemptions: true,
    },
  });

  const labels = coupons.map((coupon) => coupon.code);
  const data = coupons.map((coupon) => coupon.usedRedemptions || 0);

  return { labels, data };
}
