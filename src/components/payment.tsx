'use client';

import CheckoutPage from '@/components/checkoutPage';
import convertSubcurrency from '@/lib/convertSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

interface StripeCheckoutProps {
    amount: number;
}

export default function StripeCheckout({ amount }: StripeCheckoutProps) {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
        throw new Error('You need to set the NEXT_PUBLIC_STRIPE_PUBLIC_KEY environment variable.');
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    return (
        <div className='w-1/2 mx-auto mt-10 border-2 p-2 rounded-sm pb-4'>
            <Elements
                stripe={stripePromise}
                options={{
                    mode: 'payment',
                    amount: convertSubcurrency(amount), // Use the passed amount prop
                    currency: 'php',
                }}
            >
                <CheckoutPage amount={amount} />
            </Elements>
        </div>
    );
}
