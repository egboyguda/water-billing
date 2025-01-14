'use client'

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { use, useEffect, useState } from "react"

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [clientSecret, setClientSecret] = useState<string>("")
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        })
            .then(response => response.json())
            .then(data => {
                setClientSecret(data.clientSecret)
            })
    }, [amount])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            return
        }
        const { error: submitError } = await elements.submit()
        if (submitError) {
            setErrorMessage(submitError.message)
            setIsProcessing(false)
            return
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: 'http://www.localhost:3000/payment/success'
            }
        });
        if (error) {
            setErrorMessage(error.message)
        }
        setIsProcessing(false)
        //return spinner

    }
    if (!clientSecret || !stripe || !elements) {
        //make spiner
        return (
            <div >loading...</div>
        )
    }
    return (<form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        {errorMessage && <p>{errorMessage}</p>}


        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={isProcessing}>
            {!isProcessing ? 'pay ' : 'processing'}
        </button>
    </form>)

}
export default CheckoutPage