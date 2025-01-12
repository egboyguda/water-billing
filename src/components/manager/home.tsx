import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTotalBillAmount } from "@/db/queries/getBilling";
import { getCustomerCount } from "@/db/queries/getCustomer";
import { getTotalWaterUsage } from "@/db/queries/getWaterUsage";
import { Droplet, DollarSign, Users } from 'lucide-react'

export async function DashboardCards() {
    const totalWaterUsage = await getTotalWaterUsage();
    const totalBill = await getTotalBillAmount();
    const totalCustomer = await getCustomerCount();
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Water Usage</CardTitle>
                    <Droplet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalWaterUsage} m³</div>

                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Billing</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₱ {totalBill}</div>

                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalCustomer}</div>

                </CardContent>
            </Card>
        </div>
    )
}

