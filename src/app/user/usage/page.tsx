import { UsageChart } from "@/components/usage/chart";

export default function Page() {
    return (<div className="m-4">
        <div className="flex flex-col md:flex-row ">
            <div className="md:w-1/3 w-full flex">
                <UsageChart />

            </div>
            <div className="bg-slate-400 mt-4 md:mt-0 h-fit p-4 rounded-md w-fit">
                <h2 className="text-xl font-bold">Billing Info</h2>
                <p className="mt-2 font-semibold">Current Bill: Php 2013.00</p>
            </div>
        </div>
    </div>)
}