"use client";

import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { SelectButton } from "primereact/selectbutton";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import CreateTicketModal from "./CreateTicketModal";
import EditTicketModal from "./EditTicketModal";
import { priceWithSpace } from "../../../../../utils/priceWithSpace";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function TicketsPage({ tickets }) {
  const [showDialog, setShowDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [sizeOptions] = useState([
    { label: "Small", value: "small" },
    { label: "Normal", value: "normal" },
    { label: "Large", value: "large" },
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);

  if (!tickets.length) return <p>There are no tickets</p>;

  const columns = Object.keys(tickets[0]);

  const openEditModal = (ticket) => {
    setSelectedTicket(ticket);
    setEditDialog(true);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center text-center mb-6">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <button
          className="px-6 py-2 border-[1px] border-green-500 rounded-md text-white bg-green-500"
          onClick={() => setShowDialog(true)}
        >
          Add New
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <SelectButton
          value={size}
          onChange={(e) => setSize(e.value)}
          options={sizeOptions}
        />
      </div>
      <DataTable
        value={tickets}
        paginator
        rows={10}
        size={size}
        stripedRows
        showGridlines
        scrollable
        breakpoint="1200px"
      >
        {columns.map((col) => (
          <Column
            key={col}
            field={col}
            header={formatHeader(col)}
            sortable
            body={(rowData) => formatValue(col, rowData[col])}
          />
        ))}
        <Column
          header="Actions"
          body={(rowData) => (
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-text"
              onClick={() => openEditModal(rowData)}
              tooltip="Edit"
              tooltipOptions={{ position: "top" }}
            />
          )}
        />
      </DataTable>

      <CreateTicketModal
        visible={showDialog}
        onClose={() => setShowDialog(false)}
      />
      <EditTicketModal
        visible={editDialog}
        onClose={() => setEditDialog(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}

// Oszlopnevek formázása (pl. "validFrom" -> "Érvényes tól")
function formatHeader(header) {
  const headerMap = {
    id: "ID",
    name: "Ticket Name",
    description: "Description",
    priceInEur: "EUR Price",
    priceInHuf: "HUF Price",
    currency: "Currency",
    quantityAvailable: "Available",
    maxPerUser: "Max per User",
    saleStart: "Sale Start",
    saleEnd: "Sale End",
  };
  return headerMap[header] || header;
}

// Dátumok és egyéb értékek formázása
function formatValue(col, value) {
  if (typeof value === "boolean") {
    return value ? "✅ Active" : "❌ Inactive";
  }
  if (!value) return "-";

  if (col.includes("sale") || col === "createdAt") {
    return new Date(value).toLocaleDateString("hu-HU");
  }
  if (col === "priceInEur" || col === "priceInHuf") {
    return priceWithSpace(value, true);
  }

  return value;
}
