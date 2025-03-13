"use client";

import React, { useState } from "react";
import { OrderList } from "primereact/orderlist";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { priceWithSpaceForAdmin } from "../../../../../utils/priceWithSpace";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Segédfüggvény: Dátum formázása
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("hu-HU", { hour12: false });
};

// Segédfüggvény: Összeg kiszámolása és formázása
const formatAmount = (order) => {
  let amount = 0;
  let currencyLabel = "";
  if (order.currency === "EUR") {
    amount = priceWithSpaceForAdmin(order.finalAmountInCents / 100);
    currencyLabel = "EUR";
  } else if (order.currency === "HUF") {
    amount = priceWithSpaceForAdmin(order.finalAmountInCents / 100);
    currencyLabel = "HUF";
  } else if (order.currency === "SATS") {
    const discount = order.discountInCents || 0;
    amount = (order.totalAmountInCents - discount) / 100;
    currencyLabel = "sats";
  }
  return `${amount} ${currencyLabel}`;
};

const OrderListComponent = ({ ordersForGeneralTab }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setDisplayDialog(true);
  };

  const hideDialog = () => {
    setDisplayDialog(false);
    setSelectedOrder(null);
  };

  // Egyedi sablon, ami hasonlít a PrimeReact demó "products" stílusára
  const itemTemplate = (order) => {
    return (
      <div
        className="flex items-center gap-4 p-2 cursor-pointer"
        onClick={() => openOrderDetails(order)}
      >
        {/* Kép */}
        <img
          src="/ticket.png"
          alt="Ticket"
          className="w-8 h-8 lg:w-12 lg:h-12 rounded shadow-md flex-shrink-0"
        />
        {/* Két soros szöveg */}
        <div className="flex flex-col">
          <span className="font-semibold text-sm lg:text-base text-gray-800">
            {order.email}
          </span>
          <span className="text-xs lg:text-sm text-gray-500">
            {formatDate(order.createdAt)}
          </span>
        </div>
        {/* Jobb oldalon az ár (automatikusan a jobb szélére kerül a ml-auto miatt) */}
        <span className="ml-auto text-sm lg:text-base font-bold text-gray-900">
          {formatAmount(order)}
        </span>
      </div>
    );
  };

  //   const dialogFooter = (
  //     <div>
  //       <Button
  //         label="Close"
  //         icon="pi pi-times"
  //         onClick={hideDialog}
  //         className="p-button-text"
  //       />
  //     </div>
  //   );

  return (
    <div className="card">
      <OrderList
        value={ordersForGeneralTab}
        header="Orders"
        filter
        filterBy="email"
        filterPlaceholder="Search by email"
        itemTemplate={itemTemplate}
        className="max-w-[600px]"
      />

      <Dialog
        header="Order Details"
        visible={displayDialog}
        style={{ width: "90vw", maxWidth: "600px" }}
        onHide={hideDialog}
      >
        {selectedOrder && (
          <div className="space-y-4 p-4">
            <div>
              <span className="font-bold text-gray-700">Email:</span>
              <div className="text-gray-900">{selectedOrder.email}</div>
            </div>
            <div>
              <span className="font-bold text-gray-700">Date:</span>
              <div className="text-gray-900">
                {formatDate(selectedOrder.createdAt)}
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700">Total Amount:</span>
              <div className="text-gray-900">{formatAmount(selectedOrder)}</div>
            </div>
            {selectedOrder.coupon && (
              <div>
                <span className="font-bold text-gray-700">Coupon:</span>
                <div className="text-gray-900">{selectedOrder.coupon.code}</div>
              </div>
            )}
            <div>
              <span className="font-bold text-gray-700">Items:</span>
              <ul className="space-y-2 mt-2">
                {selectedOrder.items?.map((item) => {
                  // Alap ár (feltételezve, hogy item.priceAtPurchase az eredeti ár centben)
                  let basePrice = item.priceAtPurchase;
                  let adjustedPrice = basePrice; // alapértelmezett, ha nincs kupon
                  // Ha van kupon kedvezmény az egész orderben, és a valuta EUR vagy HUF
                  if (
                    selectedOrder.coupon &&
                    (selectedOrder.currency === "EUR" ||
                      selectedOrder.currency === "HUF")
                  ) {
                    // Összegyűjtjük az összes item árát (centben) az orderben
                    const totalItemCost = selectedOrder.items.reduce(
                      (sum, it) => sum + it.priceAtPurchase * it.quantity,
                      0
                    );
                    const discount = selectedOrder.discountInCents || 0;
                    const discountRatio =
                      totalItemCost > 0 ? discount / totalItemCost : 0;
                    adjustedPrice = basePrice * (1 - discountRatio);
                  }
                  const actualPrice = (adjustedPrice / 100).toFixed(2);
                  return (
                    <li key={item.id} className="text-sm text-gray-800">
                      <span className="font-semibold">
                        {item.ticket ? item.ticket.name : "Ticket"}
                      </span>{" "}
                      - Qty: {item.quantity} - Price:{" "}
                      {priceWithSpaceForAdmin(Number(actualPrice))}{" "}
                      {(selectedOrder.currency === "EUR" ||
                        selectedOrder.currency === "HUF") &&
                        selectedOrder.currency}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default OrderListComponent;
