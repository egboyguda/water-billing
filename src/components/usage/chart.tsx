"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,

    ChartTooltipContent,
} from "@/components/ui/chart"

interface MonthlyUsage {
    month: string;      // Name of the month (e.g., 'January', 'February', etc.)
    waterUsage: number; // The water usage for that month
}

interface UsageChartProps {
    monthlyUsage: MonthlyUsage[];
}

export function UsageChart({ monthlyUsage }: UsageChartProps) {
    // Handle case when monthlyUsage is null or undefined
    if (!monthlyUsage || monthlyUsage.length === 0) {
        return <div>No data available for the last five months.</div>;
    }

    // Sort the data in descending order from the earliest month to the most recent
    const sortedMonthlyUsage = monthlyUsage.sort((a, b) => {
        const monthOrder = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });

    // Prepare chart data and config based on the sorted data
    const chartData = sortedMonthlyUsage.map((data) => ({
        browser: data.month, // Use dynamic month names
        visitors: data.waterUsage, // Use dynamic water usage
        fill: `var(--color-${data.month.toLowerCase()})`, // Dynamic color for each month
    }));

    const chartConfig = sortedMonthlyUsage.reduce((acc, { month }, index) => {
        acc[month.toLowerCase()] = {
            label: month,
            color: `hsl(var(--chart-${index + 1}))`,
        };
        return acc;
    }, {
        visitors: {
            label: "Usage",
        },
    } as ChartConfig);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Water Usage Monthly</CardTitle>
                <CardDescription>January - December 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ bottom: 40, top: 20 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="browser"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value: string) => value}
                                angle={-45} // Rotate month labels to avoid overlap
                                textAnchor="end" // Align text properly
                            />
                            <YAxis />
                            <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Bar
                                dataKey="visitors"
                                fill="var(--color-primary)"
                                strokeWidth={2}
                                radius={8}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Water Usage increase by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total water usage on the last 30 days
                </div>
            </CardFooter>
        </Card>
    );
}
