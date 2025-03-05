import CheckoutPage from './checkoutPage';
import { getTickets } from '@/app/actions/ticket';

async function fetchCheckoutPageData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/checkout-page?locale=${locale}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch checkout data page's data");
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchCardPaymentForm(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/card-payment-form?locale=${locale}`,
  );
  if (!res.ok) {
    throw new Error('Failed to fetch card payment form data');
  }
  const data = await res.json();
  return data.data || [];
}

async function fetchOutsideData(locale) {
  const [ticketRes, comingSoonRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ticket-cards?locale=${locale}&sort=order`),
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/coming-soon-form?locale=${locale}`),
  ]);

  const [ticketData, comingSoonData] = await Promise.all([ticketRes.json(), comingSoonRes.json()]);

  if (!ticketRes.ok) {
    throw new Error('Failed to fetch ticket card data');
  }
  if (!comingSoonRes.ok) {
    throw new Error('Failed to fetch coming soon form data');
  }

  return { ticketData: ticketData.data, comingSoonData: comingSoonData.data } || [];
}

export default async function Checkout({ params }) {
  const tickets = await getTickets();
  const { locale } = await params;
  const checkoutPageData = await fetchCheckoutPageData(locale);
  const cardPaymentFormData = await fetchCardPaymentForm(locale);
  const { ticketData, comingSoonData } = await fetchOutsideData(locale);

  return (
    <CheckoutPage
      tickets={tickets}
      locale={locale}
      checkoutPageData={checkoutPageData}
      cardPaymentFormData={cardPaymentFormData}
      ticketData={ticketData}
      comingSoonData={comingSoonData}
    />
  );
}
