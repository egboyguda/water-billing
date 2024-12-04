"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "january", visitors: 187, fill: "var(--color-january)" },
    { browser: "february", visitors: 200, fill: "var(--color-february)" },
    { browser: "march", visitors: 275, fill: "var(--color-march)" },
    { browser: "april", visitors: 173, fill: "var(--color-april)" },

]

const chartConfig = {
    visitors: {
        label: "Usage",
    },
    january: {
        label: "January",
        color: "hsl(var(--chart-1))",
    },
    february: {
        label: "February",
        color: "hsl(var(--chart-2))",
    },
    march: {
        label: "March",
        color: "hsl(var(--chart-3))",
    },
    april: {
        label: "April",
        color: "hsl(var(--chart-4))",
    },

} satisfies ChartConfig

export function UsageChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Water Usage Monthly</CardTitle>
                <CardDescription>January - December 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="browser"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="visitors"
                            strokeWidth={2}
                            radius={8}
                            activeIndex={2}

                        />
                    </BarChart>
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
    )
}
