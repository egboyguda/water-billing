
import StripeCheckout from "@/components/payment";
import { getBillingUser } from "@/db/queries/getBilling";

export default async function Checkout() {
    const billsData = await getBillingUser();

    // Calculate the total amount or use a specific logic
    const totalAmount = billsData?.bills?.reduce((sum, bill) => sum + bill.amount, 0) || 0;

    return (
        <StripeCheckout amount={totalAmount} />
    );
}
