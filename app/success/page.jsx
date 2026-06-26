import { redirect } from 'next/navigation'
import { stripe } from '../lib/stripe'
import { insertTransaction } from '../lib/actions/transactions'
import Link from 'next/link'


export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        id: stripeSessionId,
        status,
        metadata,
        payment_intent,
        customer_details: { email: customerEmail },
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    const {
        bookId,
        writerId,
        buyerId,
        price,
        genre
    } = metadata;

    const transactionId = payment_intent.id;

    const transactionDetails = {
        bookId,
        writerId,
        buyerId,
        price,
        id: transactionId,
        stripeSessionId: stripeSessionId,
        date: new Date().toLocaleDateString(),
        type: 'purchase',
        email: customerEmail,
        genre
    }

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        const res = await insertTransaction(transactionDetails)

        return (
            <main className="min-h-dvh flex items-center justify-center px-6 py-16 sm:py-24">
                <style>{`
                    @keyframes successFadeUp {
                        from { opacity: 0; transform: translateY(16px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes sealStamp {
                        0% { opacity: 0; transform: rotate(-9deg) scale(1.4); }
                        60% { opacity: 1; transform: rotate(-9deg) scale(0.94); }
                        100% { opacity: 1; transform: rotate(-9deg) scale(1); }
                    }
                    .success-fade {
                        animation: successFadeUp 420ms ease-out both;
                    }
                    .success-seal {
                        animation: sealStamp 360ms ease-out both;
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .success-fade, .success-seal { animation: none; }
                    }
                `}</style>

                <section id="success" className="w-full max-w-xl">

                    <div className="flex justify-center mb-8 success-fade" aria-hidden="true">
                        <svg width="120" height="18" viewBox="0 0 120 18" fill="none">
                            <path
                                d="M0 12 Q 10 2, 20 12 T 40 12 T 60 12 T 80 12 T 100 12 T 120 12"
                                stroke="var(--color-wave)"
                                strokeWidth="2.5"
                                fill="none"
                            />
                        </svg>
                    </div>

                    <div className="relative card-ink border-ink px-8 py-12 sm:px-14 sm:py-16">

                        {/* seal / hanko stamp — signature element */}
                        <div
                            className="success-seal absolute -top-8 -right-4 sm:-right-8 w-20 h-20 sm:w-24 sm:h-24 rotate-[-9deg]"
                            style={{ animationDelay: '380ms' }}
                            aria-hidden="true"
                        >
                            <div
                                className="absolute inset-0 rounded-sm border-[3px] border-ink"
                                style={{ backgroundColor: 'var(--color-sun)' }}
                            />
                            <div className="absolute inset-[6px] rounded-sm border border-ink" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-ink">
                                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="mb-1">
                                    <path
                                        d="M0 8 Q 3 2, 6 8 T 12 8 T 18 8 T 24 8"
                                        stroke="var(--color-ink)"
                                        strokeWidth="1.6"
                                        fill="none"
                                    />
                                </svg>
                                <span className="text-[0.6rem] font-bold tracking-[0.18em] leading-none">PAID</span>
                            </div>
                        </div>

                        <p
                            className="success-fade text-xs font-semibold tracking-[0.22em] uppercase mb-3"
                            style={{ color: 'var(--color-wave)', animationDelay: '60ms' }}
                        >
                            Order Confirmed
                        </p>

                        <h1
                            className="success-fade section-heading text-3xl sm:text-4xl mb-7 pb-3"
                            style={{ animationDelay: '120ms' }}
                        >
                            The Ink Has Dried
                        </h1>

                        <p
                            className="success-fade text-base leading-relaxed mb-10 max-w-md"
                            style={{ animationDelay: '180ms' }}
                        >
                            Your copy has been struck from the block. A confirmation is on its way to{' '}
                            <span className="font-semibold">{customerEmail}</span>. Questions about your
                            order can be sent to{' '}
                            <a
                                href="mailto:orders@example.com"
                                className="underline underline-offset-2"
                                style={{ color: 'var(--color-prussian)' }}
                            >
                                orders@example.com
                            </a>.
                        </p>

                        {/* colophon — the printer's record, traditionally set at the close of a woodblock-printed book */}
                        <div
                            className="success-fade border-t border-ink-thin pt-6 mb-10"
                            style={{ animationDelay: '240ms' }}
                        >
                            <p
                                className="text-[0.7rem] uppercase tracking-[0.18em] mb-4 opacity-60"
                            >
                                Colophon
                            </p>
                            <dl
                                className="grid grid-cols-[auto,1fr] gap-x-6 gap-y-2.5 text-sm"
                                style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
                            >
                                <dt className="opacity-50">Edition No.</dt>
                                <dd className="truncate" title={bookId}>{bookId}</dd>

                                <dt className="opacity-50">Order ID</dt>
                                <dd className="truncate" title={transactionId}>{transactionId}</dd>

                                <dt className="opacity-50">Amount</dt>
                                <dd>${price}</dd>
                            </dl>
                        </div>

                        <div
                            className="success-fade flex flex-col sm:flex-row gap-3"
                            style={{ animationDelay: '300ms' }}
                        >
                            <Link href="/books" className="btn-primary justify-center flex-1 sm:flex-none">
                                Go to your library
                            </Link>
                            <Link href="/" className="btn-ghost justify-center flex-1 sm:flex-none">
                                Return home
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}