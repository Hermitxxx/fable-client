import { insertTransaction } from '@/app/lib/actions/transactions';
import { stripe } from '@/app/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.text();

    const sig = req.headers.get('stripe-signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: 400 }
        );
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const {
            bookId,
            writerId,
            buyerId,
            price,
        } = session.metadata;

        const transactionDetails = {
            bookId,
            writerId,
            buyerId,
            price,
            transactionId: session.payment_intent,
            stripeSessionId: session.id,
        }

        const res = await insertTransaction(transactionDetails)

        console.log(session);
    }

    return NextResponse.json({ received: true });
}