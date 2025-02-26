import Stripe from 'stripe';
import { priceWithSpace } from '../../../../../../utils/priceWithSpace';
import PaymentClientStripe from './PaymentClientStripe';
import { getOrder } from '@/app/actions/orders';
import { getTicket, getTickets } from '@/app/actions/ticket';
import { fetchTicketCards } from '@/components/SinglePageComponents/TicketsSection';
import { cln } from '@/utilities/classnames';
import PaymentIntentCreator from './PaymentIntentCreator';

async function fetchOrderSummary(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/order-summary?locale=${locale}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch order summary data');
  }

  const data = await res.json();
  return data.data || [];
}



export default async function PaymentPage({ params }) {
  const { id } = await params;
  const { locale } = await params;
  const orderSummaryData = await fetchOrderSummary(locale);
  const ticketCards = await fetchTicketCards(locale);

  if (!id) {
    return <div className="text-red-500">❌ {orderSummaryData.invalidOrder}</div>;
  }

  let order;
  try {
    order = await getOrder(id);
    console.log('🟢 Order received:', order);
  } catch (err) {
    return (
      <div className="text-red-500">
        ❌ {orderSummaryData.error}: {err.message}
      </div>
    );
  }

  // // TODO: Ez az if kell ide? mert csak kinyillik bezarodik de nincs benne semmi function
  // if (order.status === 'PENDING' || order.status === 'FAILED' || order.status === 'CANCELLED') {
  // }

  // console.log('stripe final amount', order.finalAmountInCents);
  // console.log('orders currency: ', order.currency);
  // const paymentIntent = await stripe.paymentIntents.create(
  //   {
  //     amount: order.finalAmountInCents,
  //     currency: order.currency.toLowerCase(),
  //     metadata: { orderId: order.id },
  //   },
  //   {
  //     idempotencyKey: `order_${order.id}`,
  //   },
  // );

  // if (paymentIntent.client_secret == null) {
  //   throw Error('Stripe failed to create payment intent');
  // }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md mt-[100px] rounded-lg">
      <h1 className="text-2xl font-bold">{orderSummaryData.orderSummaryTitle}</h1>

      {/* Email */}
      <p className="mt-2 text-gray-700">
        {orderSummaryData.email} <strong>{order.email}</strong>
      </p>

      {/* Order Items */}
      <div className="mt-4 flex flex-col border-t pt-4 gap-y-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{orderSummaryData.purchasedTickets}</h2>
          <ul className="mt-2 space-y-2">
            {order.items.map((item) => {
              // WE CHECK THE ORDER NUMBER OF TICKETCARDS and if they match the id of backend ticket
              const matchedTicket = ticketCards?.find(
                (ticketCard) => ticketCard.order === item.ticketId,
              );
              return (
                <li key={item.id} className="flex justify-between border-b pb-2">
                  {ticketCards && <span>{matchedTicket?.PassTitle}</span>}
                  <span>
                    {item.quantity} × {priceWithSpace(item.priceAtPurchase, locale !== 'hu')}{' '}
                    {locale === 'en' ? 'EUR' : 'Ft'}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col mt-5 gap-y-2">
          <h2 className="text-lg font-semibold">{orderSummaryData.paymentDetails}</h2>
          <div className="flex flex-col gap-y-2">
            {order.coupon && (
              <div className="flex flex-row justify-between mt-2">
                <p className="text-[16px]">{orderSummaryData.total} </p>
                <p className="text-[16px]">
                  {priceWithSpace(order.totalAmountInCents, locale !== 'hu')}{' '}
                  {locale === 'hu' ? 'Ft' : 'EUR'}
                </p>
              </div>
            )}
            {/* Coupon Section */}
            {order.coupon && (
              <div className="flex flex-col gap-y-1 bg-green-100 py-2 px-3 rounded-md">
                <h2 className="text-[16px] text-green-800">{orderSummaryData.discountApplied}</h2>
                <div className="flex flex-col gap-y-2 xxs:flex-row xxs:gap-y-0">
                  <div className="flex flex-col xs:flex-row gap-x-4">
                    <p className="text-green-700 xs:border-r-2 border-green-300 pr-4">
                      {orderSummaryData.code}: <strong>{order.coupon.code}</strong>
                    </p>
                    <p className="text-green-700">
                      {orderSummaryData.discount}
                      {': '}
                      <strong>
                        {order.coupon.discountType === 'FIXED'
                          ? `-${priceWithSpace(order.coupon.discountValue, locale !== 'hu')} ${
                              locale === 'hu' ? 'Ft' : 'EUR'
                            }`
                          : `-${order.coupon.discountValue}%`}
                      </strong>
                    </p>
                  </div>

                  <p className="text-green-700 font-bold text-[16px] ml-auto mt-auto">
                    -{priceWithSpace(order.discountInCents, locale !== 'hu')}{' '}
                    {locale === 'hu' ? 'Ft' : 'EUR'}
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-row justify-between mt-2">
              <p className="font-bold text-[20px]">{orderSummaryData.finalAmount} </p>
              <p className="text-[20px] font-bold">
                {priceWithSpace(order.finalAmountInCents, locale !== 'hu')}{' '}
                {locale === 'hu' ? 'Ft' : 'EUR'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-6 pt-4 gap-y-1 flex flex-col xs:flex-row xs:justify-between">
        <div className="flex flex-row gap-x-2">
          <p>{orderSummaryData.paymentProvider}</p>
          <p className="font-bold text-[16px]">{order.paymentProvider}</p>
        </div>

        <div className="flex flex-row gap-x-2">
          <p>
            {orderSummaryData.paymentStatus}
            {':'}
          </p>
          <p
            className={cln(
              'font-bold',
              order.status === 'PENDING' ? 'text-yellow-500' : 'text-green-600',
            )}
          >
            {order.status}
          </p>
        </div>
      </div>
      <div className="mt-10">
        <PaymentIntentCreator
          order={order}
          locale={locale}
          buttonText={orderSummaryData.purchase}
          currency={locale === 'hu' ? 'Ft' : 'EUR'}
        />
      </div>
    </div>
  );
}
