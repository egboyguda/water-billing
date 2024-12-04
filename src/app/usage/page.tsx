import { UsageChart } from "@/components/usage/chart";
import { UsageTable } from "@/components/usage/table";

export default function Page() {
    return (<div className="m-4">
        <div className="w-1/3">
            <UsageChart />
        </div>
        <UsageTable />
    </div>);
}