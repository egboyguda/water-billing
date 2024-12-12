import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BillTable from "@/components/bill/billTable";
import GenerateBillsButton from "@/components/bill/generateBillBtn";
import { getAllBillsWithUsageAndProfileName } from "@/db/queries/getBilling";

export default async function Page() {
    const billsData = await getAllBillsWithUsageAndProfileName(); // Rename to billsData

    return (
        <div>
            <div className="m-4 mt-20 space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="text" placeholder="Search a costumer" />
                        <Button type="submit" variant="outline">
                            Search
                        </Button>
                    </div>
                    <GenerateBillsButton />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl w-full md:min-h-min mt-2 space-y-2">
                    <h2 className="text-2xl font-light">Billing</h2>
                    {billsData.success ? ( // Conditionally render the table
                        <BillTable bills={billsData.bills} /> // Pass bills as prop
                    ) : (
                        <div>{billsData.message || "Error loading bills."}</div> // Display error message
                    )}
                </div>
            </div>
        </div>
    );
}