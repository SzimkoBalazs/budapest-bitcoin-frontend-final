import { getTickets } from "@/app/actions/ticket";
import CheckoutPage from "./checkoutPage";

export default async function Checkout({params}) {
  const tickets = await getTickets();
  const { locale } = await params;
  return <CheckoutPage tickets={tickets} locale={locale}/>;
}
