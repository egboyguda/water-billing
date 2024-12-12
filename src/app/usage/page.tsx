
import { UsageChart } from "@/components/usage/chart";
import { UsageTable } from "@/components/usage/table";
import { getWaterUsageForLastFiveMonthsAdmin } from "@/db/queries/getWaterUsage";

export default async function Page() {
    const monthlyUsage = await getWaterUsageForLastFiveMonthsAdmin();

    return (<div className="m-4">
        <div className="md:w-1/3 w-full">
            <UsageChart monthlyUsage={monthlyUsage || []} />
        </div>
        <UsageTable />
    </div>
    );
}