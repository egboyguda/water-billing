// pages/page.tsx
import BillTable from "@/components/user/billing/billTable";
import { getBillingUser, getCostPerCubic } from "@/db/queries/getBilling";

export default async function Page() {
    const billsData = await getBillingUser();
    const cost = await getCostPerCubic();
    return (
        <div className="m-4">
            <div className="min-h-[100vh] flex-1 rounded-xl w-full md:min-h-min mt-2 space-y-2">
                <h2 className="text-2xl font-light">Your Bills</h2>
                {billsData.success && billsData.bills ? (
                    <BillTable bills={billsData.bills} cost={cost?.costperMeter || 0} />
                ) : (
                    <div>{billsData.message || "Error loading bills."}</div>
                )}
            </div>
        </div>
    );
}
