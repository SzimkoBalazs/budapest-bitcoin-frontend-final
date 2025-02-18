"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { updateTicket } from "@/app/actions/ticket";

export default function EditTicketModal({ visible, onClose, ticket }) {
  const [editedTicket, setEditedTicket] = useState(ticket);

  useEffect(() => {
    if (ticket) {
      setEditedTicket({
        id: ticket.id ?? "",
        name: ticket.name ?? "",
        description: ticket.description ?? "",
        priceInEur:
          ticket.priceInEur !== undefined && ticket.priceInEur !== null
            ? String(ticket.priceInEur / 100)
            : "",
        priceInHuf:
          ticket.priceInHuf !== undefined && ticket.priceInHuf !== null
            ? String(ticket.priceInHuf)
            : "",
        currency: ticket.currency ?? "EUR",
        quantityAvailable:
          ticket.quantityAvailable !== undefined &&
          ticket.quantityAvailable !== null
            ? String(ticket.quantityAvailable)
            : "",
        maxPerUser:
          ticket.maxPerUser !== undefined && ticket.maxPerUser !== null
            ? String(ticket.maxPerUser)
            : "",

        saleStart: ticket.saleStart ? new Date(ticket.saleStart) : undefined,
        saleEnd: ticket.saleEnd ? new Date(ticket.saleEnd) : undefined,
      });
    }
  }, [ticket]);

  if (!editedTicket) return null;

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setEditedTicket((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const response = await updateTicket(editedTicket);
    if (response.success) {
      onClose();
      window.location.reload(); // Az oldal frissítése, hogy megjelenjenek a frissített adatok
    } else {
      alert(response.message);
    }
  };

  if (!editedTicket) return null;

  return (
    <Dialog
      visible={visible}
      onHide={onClose}
      header="Edit Ticket"
      modal
      className="w-[450px]"
    >
      <div className="flex flex-col gap-4">
        <label>Name</label>
        <InputText
          className="w-full p-inputtext"
          value={editedTicket.name}
          onChange={(e) => handleInputChange(e, "name")}
        />

        <label>Description</label>
        <InputText
          className="w-full p-inputtext"
          value={editedTicket.description}
          onChange={(e) => handleInputChange(e, "description")}
        />

        <label>EUR Price</label>
        <InputText
          className="w-full p-inputtext"
          value={editedTicket.priceInEur}
          onChange={(e) => handleInputChange(e, "priceInEur")}
        />

        <label>HUF Price</label>
        <InputText
          className="w-full p-inputtext"
          value={editedTicket.priceInHuf}
          onChange={(e) => handleInputChange(e, "priceInHuf")}
        />

        <label>Currency</label>
        <Dropdown
          className="w-full"
          value={editedTicket.currency}
          options={[{ label: "EUR", value: "EUR" }]}
          onChange={(e) => handleInputChange(e, "currency")}
        />

        <label>Quantity Available</label>
        <InputText
          className="w-full p-inputtext"
          value={editedTicket.quantityAvailable}
          onChange={(e) => handleInputChange(e, "quantityAvailable")}
        />

        <label>Max per User</label>
        <InputText
          className="w-full p-inputtext"
          value={editedTicket.maxPerUser}
          onChange={(e) => handleInputChange(e, "maxPerUser")}
        />

        <label>Sale Start</label>
        <Calendar
          className="w-full"
          value={editedTicket.saleStart}
          onChange={(e) =>
            setEditedTicket({ ...editedTicket, saleStart: e.value })
          }
          showIcon
        />

        <label>Sale End</label>
        <Calendar
          className="w-full"
          value={editedTicket.saleEnd}
          onChange={(e) =>
            setEditedTicket({ ...editedTicket, saleEnd: e.value })
          }
          showIcon
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
