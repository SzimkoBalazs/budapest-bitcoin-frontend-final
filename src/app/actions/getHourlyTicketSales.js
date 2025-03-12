"use server";
import { getHourlyTicketSalesByType } from "./adminInfo";

export async function getHourlyTicketSalesExpo() {
  return getHourlyTicketSalesByType("expo pass");
}

export async function getHourlyTicketSalesConference() {
  return getHourlyTicketSalesByType("conference pass");
}

export async function getHourlyTicketSalesWhale() {
  return getHourlyTicketSalesByType("whale pass");
}
