import Stripe from 'stripe';
import { redirect } from 'next/navigation';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);



export const handleCheckout = async (starting_rank: string,starting_division: number,ending_rank: string,ending_division: number,server: string,lp: string,boosting_type: string, addons: any, result: number, userId: string) => {
  "use server"
    const price = Number((result! * 100 || 0).toFixed(2))
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell              
          price_data: {
              unit_amount: price,
              currency: server === "EUW" ? 'eur' : server === "NA" ? 'usd' : 'usd',
              product_data: {
                name: 'boosting service',
              },
          },
          quantity: 1,
        },
      ],
      metadata: {
        starting_rank,
        starting_division,
        ending_rank,
        ending_division,
        server, 
        lp,
        boosting_type,
        addons: JSON.stringify(addons),
        price,
        userId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/lol-boosting/succeeded_order`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/lol-boosting/canceled_order`,
    });
    return session.url!
}


