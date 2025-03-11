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
          className="w-12 h-12 rounded shadow-md flex-shrink-0"
        />
        {/* Két soros szöveg */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{order.email}</span>
          <span className="text-sm text-gray-500">
            {formatDate(order.createdAt)}
          </span>
        </div>
        {/* Jobb oldalon az ár (automatikusan a jobb szélére kerül a ml-auto miatt) */}
        <span className="ml-auto font-bold text-gray-900">
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
        style={{ width: "50vw" }}
        onHide={hideDialog}
      >
        {selectedOrder && (
          <div>
            <div>
              <strong>Email:</strong> {selectedOrder.email}
            </div>
            <div>
              <strong>Date:</strong> {formatDate(selectedOrder.createdAt)}
            </div>
            <div>
              <strong>Total Amount:</strong> {formatAmount(selectedOrder)}
            </div>
            {selectedOrder.coupon && (
              <div>
                <strong>Coupon:</strong> {selectedOrder.coupon.code}
              </div>
            )}
            <div className="mt-2">
              <strong>Items:</strong>
              <ul>
                {selectedOrder.items?.map((item) => (
                  <li key={item.id}>
                    {item.ticket ? item.ticket.name : "Ticket"} - Qty:{" "}
                    {item.quantity} - Price:{" "}
                    {(item.priceAtPurchase / 100).toFixed(2)}{" "}
                    {selectedOrder.currency === "EUR"
                      ? "EUR"
                      : selectedOrder.currency === "HUF"
                      ? "HUF"
                      : "sats"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default OrderListComponent;
