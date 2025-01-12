import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getComplaintCountsByStatus } from "@/db/queries/getComplaint"

export async function CustomerComplaints() {
    const complaintCount = await getComplaintCountsByStatus();
    const totalComplaints = complaintCount.pending + complaintCount.resolved

    const resolvedComplaints = complaintCount.resolved
    const pendingComplaints = complaintCount.pending
    const resolutionRate = (resolvedComplaints / totalComplaints) * 100

    return (
        <Card>
            <CardHeader>
                <CardTitle>Customer Complaints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between mb-2">
                        <span>Resolution Rate</span>
                        <span>{resolutionRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={resolutionRate} className="h-2" />
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm font-medium">Resolved</p>
                        <p className="text-2xl font-bold">{resolvedComplaints}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Pending</p>
                        <p className="text-2xl font-bold">{pendingComplaints}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Total</p>
                        <p className="text-2xl font-bold">{totalComplaints}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

