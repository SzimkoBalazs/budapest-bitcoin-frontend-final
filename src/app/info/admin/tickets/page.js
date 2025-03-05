import React from "react";
import TicketsPage from "./TicketsPage";
import { getTicketsForAdmin } from "@/app/actions/ticket";

export const dynamic = 'force-dynamic';

const page = async () => {
  const tickets = await getTicketsForAdmin();
  return <TicketsPage tickets={tickets} />;
};

export default page;
