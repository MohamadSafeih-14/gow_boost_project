/* eslint-disable camelcase */
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { handleSuccessPayment } from "src/actions/order";
import { createOrder } from "src/lib/actions/order.actions";
// import { handleSuccessPaymentFunction } from "src/app/lol-boosting/succeeded_order/page";
import stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") as string || '';
  const endpointSecret = process.env.NEXT_STRIPE_WEBHOOK_SECRET!;
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }
  // Get the ID and type
  const eventType = event.type;
  // CREATE
  if (eventType === "checkout.session.completed") {
    const {starting_rank, starting_division, ending_rank, ending_division, server, lp, boosting_type, addons, price, userId} = event.data.object.metadata!;
    
    const order = {
      customer_id: userId,
      starting_rank,
      starting_division,
      ending_rank,
      ending_division,
      current_rank: starting_rank,
      current_division: starting_division,
      server,
      lp,
      boost_type: boosting_type,
      addons: JSON.parse(addons),
      status: 'waiting opengg',
      boosting_status: 'off',
      booster_id: '',
      openGG: '',
      price,
    }
    createOrder(order)
    return NextResponse.json({ message: "OK" });
  } else {
  }
  return new Response("its working as well", { status: 200 });
}