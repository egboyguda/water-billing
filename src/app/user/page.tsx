import { getPendingPaymentCount } from "@/db/queries/getBilling";
import { getCurrentWaterUsage } from "@/db/queries/getWaterUsage";

export default async function Page() {
    const water = await getCurrentWaterUsage();
    const bill = await getPendingPaymentCount();
    const waterUsageInMilliliters = water?.totalWaterUsage ?? 0;
    const waterUsageInCubicMeters = (waterUsageInMilliliters / 1_000_000).toFixed(3);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-cyan-600 flex flex-col justify-center items-center">
                    <div className="text-white text-center">
                        <h1 className="text-4xl font-bold">Current Water Usage</h1>
                        <p className="text-3xl font-medium">{waterUsageInMilliliters} ml</p>
                        <p className="text-2xl font-light">({waterUsageInCubicMeters} m³)</p>
                    </div>
                </div>
                <div className="aspect-video rounded-xl bg-purple-600 flex flex-col justify-center items-center">
                    <div className="text-white text-center">
                        <h1 className="text-4xl font-bold">Pending Payments</h1>
                        <p className="text-3xl font-medium">{bill.count}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
