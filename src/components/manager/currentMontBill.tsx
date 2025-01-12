import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getBillingSummaryForCurrentMonth } from "@/db/queries/getBilling";

export async function CurrentMonthPayment() {
    const billingSummary = await getBillingSummaryForCurrentMonth();
    const totalBilling = billingSummary.totalBilling
    const collectedPayment = billingSummary.totalPaidBilling
    const collectionRate = (collectedPayment / totalBilling) * 100

    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Month Payment Collection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between mb-2">
                        <span>Collection Rate</span>
                        <span>{collectionRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={collectionRate} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium">Total Billing</p>
                        <p className="text-2xl font-bold">${totalBilling.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Collected</p>
                        <p className="text-2xl font-bold">${collectedPayment.toLocaleString()}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

