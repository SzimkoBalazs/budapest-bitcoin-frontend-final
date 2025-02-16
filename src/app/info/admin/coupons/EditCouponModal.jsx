"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { updateCoupon } from "@/app/actions/coupon";

export default function EditCouponModal({ visible, onClose, coupon }) {
  const [editedCoupon, setEditedCoupon] = useState(coupon);

  // Ha a kupon adatai változnak, frissítsük a state-et
  useEffect(() => {
    if (coupon) {
      setEditedCoupon({
        id: coupon.id ?? "",
        code: coupon.code ?? "",
        discountType: coupon.discountType ?? "FIXED",
        discountValue:
          coupon.discountValue !== undefined && coupon.discountValue !== null
            ? String(coupon.discountValue)
            : "",
        maxRedemptions:
          coupon.maxRedemptions !== undefined && coupon.maxRedemptions !== null
            ? String(coupon.maxRedemptions)
            : "",
        minTicketsRequired:
          coupon.minTicketsRequired !== undefined &&
          coupon.minTicketsRequired !== null
            ? String(coupon.minTicketsRequired)
            : "",
        validFrom: coupon.validFrom ? new Date(coupon.validFrom) : undefined,
        validUntil: coupon.validUntil ? new Date(coupon.validUntil) : undefined,
        isActive: coupon.isActive ?? true,
      });
    }
  }, [coupon]);

  if (!editedCoupon) return null;

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setEditedCoupon((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const response = await updateCoupon(editedCoupon);
    if (response.success) {
      onClose();
      window.location.reload(); // Az oldal frissítése, hogy megjelenjenek a frissített adatok
    } else {
      alert(response.message);
    }
  };

  if (!editedCoupon) return null;

  return (
    <Dialog
      visible={visible}
      onHide={onClose}
      header="Edit Coupon"
      modal
      className="w-[450px]"
    >
      <div className="flex flex-col gap-4">
        <label>Coupon Code</label>
        <InputText
          className="w-full p-inputtext"
          value={editedCoupon.code}
          onChange={(e) => handleInputChange(e, "code")}
        />

        <label>Discount Type</label>
        <Dropdown
          className="w-full"
          value={editedCoupon.discountType}
          options={[
            { label: "Fixed Amount", value: "FIXED" },
            { label: "Percentage", value: "PERCENTAGE" },
          ]}
          onChange={(e) => handleInputChange(e, "discountType")}
        />

        <label>Discount Value</label>
        <InputText
          className="w-full p-inputtext"
          value={editedCoupon.discountValue}
          onChange={(e) => handleInputChange(e, "discountValue")}
        />

        <label>Max Redemptions</label>
        <InputText
          className="w-full p-inputtext"
          value={editedCoupon.maxRedemptions}
          onChange={(e) => handleInputChange(e, "maxRedemptions")}
        />

        <label>Minimum Ticketnumber</label>
        <InputText
          className="w-full p-inputtext"
          value={editedCoupon.minTicketsRequired}
          onChange={(e) => handleInputChange(e, "minTicketsRequired")}
        />

        <label>Valid From</label>
        <Calendar
          className="w-full"
          value={editedCoupon.validFrom}
          onChange={(e) =>
            setEditedCoupon({ ...editedCoupon, validFrom: e.value })
          }
          showIcon
        />

        <label>Valid Until</label>
        <Calendar
          className="w-full"
          value={editedCoupon.validUntil}
          onChange={(e) =>
            setEditedCoupon({ ...editedCoupon, validUntil: e.value })
          }
          showIcon
        />

        <label>Coupon Status</label>
        <Dropdown
          className="w-full"
          value={editedCoupon.isActive}
          options={[
            { label: "Active", value: true },
            { label: "Inactive", value: false },
          ]}
          onChange={(e) => handleInputChange(e, "isActive")}
        />

        <Button
          label="Save"
          className="w-full flex justify-center items-center"
          onClick={handleSaveChanges}
        />
      </div>
    </Dialog>
  );
}
