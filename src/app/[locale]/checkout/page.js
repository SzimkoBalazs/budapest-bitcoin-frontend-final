import { getTickets } from "@/app/actions/ticket";
import CheckoutPage from "./checkoutPage";

export default async function Checkout() {
  const tickets = await getTickets();
  return <CheckoutPage tickets={tickets} />;
}
