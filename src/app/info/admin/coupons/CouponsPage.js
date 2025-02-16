"use client";

import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { SelectButton } from "primereact/selectbutton";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import CreateCouponModal from "./createCouponModal";
import EditCouponModal from "./EditCouponModal";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function CouponsPage({ coupons }) {
  const [showDialog, setShowDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const [sizeOptions] = useState([
    { label: "Small", value: "small" },
    { label: "Normal", value: "normal" },
    { label: "Large", value: "large" },
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);

  if (!coupons.length) return <p>Nincsenek kuponok</p>;

  const columns = Object.keys(coupons[0]).filter(
    (col) => col !== "id" && col !== "createdAt"
  );

  const openEditModal = (coupon) => {
    setSelectedCoupon(coupon);
    setEditDialog(true);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center text-center mb-6">
        <h1 className="text-2xl font-bold">Coupons</h1>
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
        value={coupons}
        paginator
        size={size}
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
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
            />
          )}
        />
      </DataTable>

      <CreateCouponModal
        visible={showDialog}
        onClose={() => setShowDialog(false)}
      />
      <EditCouponModal
        visible={editDialog}
        onClose={() => setEditDialog(false)}
        coupon={selectedCoupon}
      />
    </div>
  );
}

// Oszlopnevek formázása (pl. "validFrom" -> "Érvényes tól")
function formatHeader(header) {
  const headerMap = {
    code: "Coupon Code",
    discountType: "Discount Type",
    discountValue: "Value",
    maxRedemptions: "Max Usage",
    usedRedemptions: "Actual Usage",
    minTicketsRequired: "Min Ticket",
    validFrom: "Valid from",
    validUntil: "Valid to",
    isActive: "Active",
  };
  return headerMap[header] || header;
}

// Dátumok és egyéb értékek formázása
function formatValue(col, value) {
  if (typeof value === "boolean") {
    return value ? "✅ Active" : "❌ Inactive";
  }
  if (!value) return "-";

  if (col.includes("valid") || col === "createdAt") {
    return new Date(value).toLocaleDateString("hu-HU");
  }

  return value;
}
