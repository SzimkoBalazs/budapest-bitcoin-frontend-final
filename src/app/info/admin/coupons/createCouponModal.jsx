"use client";

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { createCoupon } from "@/app/actions/coupon";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function CreateCouponModal({ visible, onClose }) {
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "FIXED",
    discountValue: "",
    maxRedemptions: "",
    minTicketsRequired: "",
    validFrom: null,
    validUntil: null,
    isActive: true,
  });

  const handleInputChange = (e, field) => {
    setNewCoupon({ ...newCoupon, [field]: e.target.value });
  };

  const handleCreateCoupon = async () => {
    const response = await createCoupon(newCoupon);
    if (response.success) {
      onClose();
      window.location.reload(); // Az oldal frissítése, hogy megjelenjen az új kupon
    } else {
      alert(response.message);
    }
  };

  return (
    <Dialog
      visible={visible}
      onHide={onClose}
      header="Create New Coupon"
      modal
      className="w-[300px] sm:w-[450px]"
    >
      <div className="flex mt-5 flex-col gap-5">
        <FloatLabel>
          <InputText
            className="w-full p-inputtext border border-gray-300 p-2 rounded"
            id="couponCode"
            value={newCoupon.code}
            onChange={(e) => handleInputChange(e, "code")}
          />
          <label htmlFor="couponCode">Coupon Code</label>
        </FloatLabel>

        <label>Discount Type</label>
        <Dropdown
          value={newCoupon.discountType}
          options={[
            { label: "Fixed Amount", value: "FIXED" },
            { label: "Percentage", value: "PERCENTAGE" },
          ]}
          onChange={(e) => handleInputChange(e, "discountType")}
        />

        <FloatLabel>
          <InputText
            id="discountValue"
            className="w-full p-inputtext border border-gray-300 p-2 rounded"
            value={newCoupon.discountValue}
            onChange={(e) => handleInputChange(e, "discountValue")}
          />
          <label htmlFor="discountValue">Discount Value</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            id="maxRedemptions"
            className="w-full p-inputtext border border-gray-300 p-2 rounded"
            value={newCoupon.maxRedemptions}
            onChange={(e) => handleInputChange(e, "maxRedemptions")}
          />
          <label htmlFor="maxRedemptions">Max Redemptions</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="minTicketsRequired"
            className="w-full p-inputtext border border-gray-300 p-2 rounded"
            value={newCoupon.minTicketsRequired}
            onChange={(e) => handleInputChange(e, "minTicketsRequired")}
          />
          <label htmlFor="minTicketsRequired">Min Tickets</label>
        </FloatLabel>

        <label>Valid From</label>
        <Calendar
          value={newCoupon.validFrom}
          onChange={(e) => setNewCoupon({ ...newCoupon, validFrom: e.value })}
          showIcon
        />

        <label>Valid Until</label>
        <Calendar
          value={newCoupon.validUntil}
          onChange={(e) => setNewCoupon({ ...newCoupon, validUntil: e.value })}
          showIcon
        />
        <label>Coupon Status</label>
        <Dropdown
          className="w-full"
          value={newCoupon.isActive}
          options={[
            { label: "Active", value: true },
            { label: "Inactive", value: false },
          ]}
          onChange={(e) => handleInputChange(e, "isActive")}
        />

        <Button label="Create" onClick={handleCreateCoupon} />
      </div>
    </Dialog>
  );
}
