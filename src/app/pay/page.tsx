'use client'

import CheckoutPage from '@/components/checkoutPage';
import convertSubcurrency from '@/lib/convertSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Check } from 'lucide-react';

export default function StripeCheckout() {
    const amount = 100

    if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
        throw new Error('You need to set the NEXT_STRIPE_PUBLIC_KEY environment variable.');
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);



    return (
        <div>
            asda
            <Elements stripe={stripePromise}
                options={{
                    mode: 'payment',
                    amount: convertSubcurrency(amount),
                    currency: 'php',

                }}
            >
                <CheckoutPage amount={amount} />
            </Elements>
        </div>
    );
}