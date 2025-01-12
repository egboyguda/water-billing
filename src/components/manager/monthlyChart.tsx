"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Define the type for the data prop
interface MonthlyBillingChartProps {
    data?: { month: string; billing: number }[]; // data is now optional
}

// Dummy data to use when `data` is null or empty
const dummyData = [
    { month: "Jan", billing: 10000 },
    { month: "Feb", billing: 9500 },
    { month: "Mar", billing: 10500 },
    { month: "Apr", billing: 11000 },
    { month: "May", billing: 12000 },
    { month: "Jun", billing: 12500 },
    { month: "Jul", billing: 13000 },
    { month: "Aug", billing: 13500 },
    { month: "Sep", billing: 14000 },
    { month: "Oct", billing: 13000 },
    { month: "Nov", billing: 12500 },
    { month: "Dec", billing: 12000 },
]

export function MonthlyBillingChart({ data = dummyData }: MonthlyBillingChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Billing per Month</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => `$${value.toLocaleString()}`}
                            labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Bar dataKey="billing" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
