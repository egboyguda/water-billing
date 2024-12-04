import SidabarNav from "@/components/common/sidabar";
import { UsageChart } from "@/components/usage/chart";
import { UsageTable } from "@/components/usage/table";

export default function Page() {

    return (<SidabarNav>
        <div className="m-4">
            <div className="md:w-1/3 w-full">
                <UsageChart />
            </div>
            <UsageTable />
        </div>
    </SidabarNav>
    );
}