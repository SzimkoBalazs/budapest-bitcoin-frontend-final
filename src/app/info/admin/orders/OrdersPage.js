"use client";

import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { SelectButton } from "primereact/selectbutton";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { resendTicketEmail } from "@/app/actions/resendTicketEmail";
import { priceWithSpace } from "../../../../../utils/priceWithSpace";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function OrdersPage({ orders }) {
  if (!orders.length) return <p>There are no orders</p>;

  const [sizeOptions] = useState([
    { label: "Small", value: "small" },
    { label: "Normal", value: "normal" },
    { label: "Large", value: "large" },
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const columns = Object.keys(orders[0]).filter(
    (col) => col !== "couponId" && col !== "reminderSent"
  );

  async function handleSendTicket(order) {
    try {
      const result = await resendTicketEmail(order);
      console.log(result.message);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  }

  // 🔹 Globális kereső a táblázat felett
  const renderHeader = () => {
    return (
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <InputText
          className="p-inputtext-sm"
          value={globalFilter}
          onChange={(e) => {
            const newFilters = {
              ...filters,
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            };
            setFilters(newFilters);
            setGlobalFilter(e.target.value);
          }}
          placeholder="Search..."
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-envelope"
        tooltip="Send ticket email"
        tooltipOptions={{ position: "top" }}
        onClick={() => handleSendTicket(rowData)}
        disabled={rowData.status !== "PAID"}
      />
    );
  };

  return (
    <div className="p-5">
      {renderHeader()}
      <div className="flex justify-center mb-4 mt-2">
        <SelectButton
          value={size}
          onChange={(e) => setSize(e.value)}
          options={sizeOptions}
        />
      </div>
      <DataTable
        value={orders}
        size={size}
        paginator
        rows={10}
        stripedRows
        showGridlines
        rowsPerPageOptions={[5, 10, 25, 50]}
        scrollable
        breakpoint="1200px"
        filters={filters}
        filterDisplay="row"
      >
        {/* 🔹 Megmarad az email oszlop szűrési lehetősége */}
        <Column
          field="email"
          header="Email"
          sortable
          filter
          filterPlaceholder="Search by email"
          filterMatchMode="contains"
        />

        {columns.map((col) =>
          col !== "email" ? (
            <Column
              key={col}
              field={col}
              header={formatHeader(col)}
              sortable
              body={(rowData) => formatValue(col, rowData[col], rowData)}
            />
          ) : null
        )}
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}

// Oszlopnevek formázása (pl. "validFrom" -> "Érvényes tól")
function formatHeader(header) {
  const headerMap = {
    id: "ID",
    email: "Email",
    totalAmountInCents: "Total Amount",
    discountInCents: "Discount",
    finalAmountInCents: "Final Amount",
    quantityAvailable: "Available",
    currency: "Currency",
    status: "Order Status",
    paymentProvider: "Provider",
    createdAt: "Created",
  };
  return headerMap[header] || header;
}

// Dátumok és egyéb értékek formázása
function formatValue(col, value, rowData) {
  if (!value) return "-";

  const priceFields = [
    "totalAmountInCents",
    "discountInCents",
    "finalAmountInCents",
  ];
  if (
    priceFields.includes(col) &&
    (rowData.currency === "EUR" || rowData.currency === "HUF")
  ) {
    // Ha az érték már centben van, a priceWithSpace alapértelmezetten eloszt 100-zal,
    // így az eredmény megfelelő formátumú lesz.
    return priceWithSpace(value);
  }

  if (col === "createdAt") {
    return new Date(value).toLocaleDateString("hu-HU");
  }

  return value;
}
