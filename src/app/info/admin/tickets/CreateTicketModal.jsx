"use client";

import { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { createTicket } from "@/app/actions/ticket";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function CreateTicketModal({ visible, onClose }) {
  const router = useRouter();
  const toast = useRef(null);

  const [newTicket, setNewTicket] = useState({
    name: "",
    description: "",
    priceInEur: "",
    priceInHuf: "",
    currency: "EUR",
    quantityAvailable: "",
    maxPerUser: "",
    saleStart: null,
    saleEnd: null,
  });

  const handleInputChange = (e, field) => {
    setNewTicket({ ...newTicket, [field]: e.target.value });
  };

  const handleCreateTicket = async () => {
    const response = await createTicket(newTicket);
    if (response.success) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Ticket created successfully!",
        life: 3000,
      });
      onClose();
      //   window.location.reload();
      router.refresh();
    } else {
      alert(response.message);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        onHide={onClose}
        header="Create New Ticket"
        modal
        className="w-[300px] sm:w-[450px]"
      >
        <div className="flex mt-5 flex-col gap-5">
          <FloatLabel>
            <InputText
              className="w-full p-inputtext border border-gray-300 p-2 rounded"
              id="name"
              value={newTicket.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
            <label htmlFor="name">Name</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              className="w-full p-inputtext border border-gray-300 p-2 rounded"
              id="description"
              value={newTicket.description}
              onChange={(e) => handleInputChange(e, "description")}
            />
            <label htmlFor="description">Description</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              className="w-full p-inputtext border border-gray-300 p-2 rounded"
              id="priceInEur"
              value={newTicket.priceInEur}
              onChange={(e) => handleInputChange(e, "priceInEur")}
            />
            <label htmlFor="priceInEur">EUR Price</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              className="w-full p-inputtext border border-gray-300 p-2 rounded"
              id="priceInHuf"
              value={newTicket.priceInHuf}
              onChange={(e) => handleInputChange(e, "priceInHuf")}
            />
            <label htmlFor="priceInHuf">HUF Price</label>
          </FloatLabel>

          <label>Currency</label>
          <Dropdown
            value={newTicket.currency}
            options={[{ label: "EUR", value: "EUR" }]}
            onChange={(e) => handleInputChange(e, "currency")}
          />

          <FloatLabel>
            <InputText
              id="quantityAvailable"
              className="w-full p-inputtext border border-gray-300 p-2 rounded"
              value={newTicket.quantityAvailable}
              onChange={(e) => handleInputChange(e, "quantityAvailable")}
            />
            <label htmlFor="quantityAvailable">Available Quantity</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              id="maxPerUser"
              className="w-full p-inputtext border border-gray-300 p-2 rounded"
              value={newTicket.maxPerUser}
              onChange={(e) => handleInputChange(e, "maxPerUser")}
            />
            <label htmlFor="maxRedemptions">Max per User</label>
          </FloatLabel>

          <label>Sale Start</label>
          <Calendar
            value={newTicket.saleStart}
            onChange={(e) => setNewTicket({ ...newTicket, saleStart: e.value })}
            showIcon
          />

          <label>Sale End</label>
          <Calendar
            value={newTicket.saleEnd}
            onChange={(e) => setNewTicket({ ...newTicket, saleEnd: e.value })}
            showIcon
          />

          <Button label="Create" onClick={handleCreateTicket} />
        </div>
      </Dialog>
    </>
  );
}
