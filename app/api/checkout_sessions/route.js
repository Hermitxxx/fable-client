import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/app/lib/stripe';
import { getBookDetailsById } from '@/app/lib/api/books';
import { getUserSession } from '@/app/lib/core/session';


export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const bookId = await request.json()
        const book = await getBookDetailsById(bookId)

        const userSession = await getUserSession()
        const user = userSession?.user

        console.log(book);

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',

                        product_data: {
                            name: book.title,
                            images: [book.coverImage],
                        },

                        unit_amount: Math.round(book.price * 100),
                    },

                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                bookId: book._id.toString(),
                writerId: book.writerId,
                buyerId: user.id,
                price: book.price.toString(),
                genre: book.genre
            },
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.json({
            url: session.url,
        });
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}