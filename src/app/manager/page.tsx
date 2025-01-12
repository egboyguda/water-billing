
import { CurrentMonthPayment } from "@/components/manager/currentMontBill"
import { CustomerComplaints } from "@/components/manager/customerComplaint"
import { DashboardCards } from "@/components/manager/home"
import { MonthlyBillingChart } from "@/components/manager/monthlyChart"
import { getMonthlyBillingForCurrentYear } from "@/db/queries/getBilling"

export default async function WaterBillingDashboard() {
    const bill = await getMonthlyBillingForCurrentYear();
    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">Reports</h1>
            <DashboardCards />
            <div className="grid gap-6 md:grid-cols-2">
                <MonthlyBillingChart data={bill} />
                <CustomerComplaints />
            </div>
            <CurrentMonthPayment />
        </div>
    )
}

