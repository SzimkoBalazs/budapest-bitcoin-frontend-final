import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { orderId, amount, currency, additionalData } = await req.json();
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount, 
        currency: currency.toLowerCase(),
        metadata: {
          orderId: orderId.toString(),
          ...additionalData, 
        },
      },
      {
        idempotencyKey: `order_${orderId}`,
      }
    );
    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
