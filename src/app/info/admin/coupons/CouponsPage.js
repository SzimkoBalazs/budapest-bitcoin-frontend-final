"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function CouponsPage({ coupons }) {
  if (!coupons.length) return <p>Nincsenek kuponok</p>;

  const columns = Object.keys(coupons[0]);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center text-center mb-6">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <button className="px-6 py-2 border-[1px] border-green-500 rounded-md text-white bg-green-500">
          Add New
        </button>
      </div>
      <DataTable
        value={coupons}
        paginator
        rows={10}
        stripedRows
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
      </DataTable>
    </div>
  );
}

// Oszlopnevek formázása (pl. "validFrom" -> "Érvényes tól")
function formatHeader(header) {
  const headerMap = {
    id: "ID",
    code: "Coupon Code",
    discountType: "Discoint Type",
    discountValue: "Value",
    maxRedemptions: "Max Usage",
    usedRedemptions: "Actual Usage",
    validFrom: "Valid from",
    validUntil: "Valid to",
    createdAt: "Created",
  };
  return headerMap[header] || header;
}

// Dátumok és egyéb értékek formázása
function formatValue(col, value) {
  if (!value) return "-";

  if (col.includes("valid") || col === "createdAt") {
    return new Date(value).toLocaleDateString("hu-HU");
  }

  return value;
}
