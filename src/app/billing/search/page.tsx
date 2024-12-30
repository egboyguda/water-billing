import { filterBills } from "@/actions/search"
import BillTable from "@/components/bill/billTable"
import CostPerCubic from "@/components/bill/costperCubic"
import GenerateBillsButton from "@/components/bill/generateBillBtn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { filterBillsActions, getCostPerCubic } from "@/db/queries/getBilling"
import { getUser } from "@/db/queries/getUser"
import { BillStatus } from "@prisma/client"

import { redirect } from "next/navigation"

export default async function Page(props: { searchParams: Promise<{ term: string, status: string }> }) {

    const searchParams = await props.searchParams
    const term = searchParams.term
    const status = searchParams.status
    const user = await getUser()
    if (!term && !status) {
        redirect("/billing")
    }
    const billsData = await filterBillsActions(status as BillStatus, term)
    const cost = await getCostPerCubic();
    return (
        <div>
            <div className="m-4 mt-20 space-y-4">
                <div className="flex justify-between items-center">
                    <form className="w-full" action={filterBills}>
                        <div className="flex w-full max-w-sm items-center space-x-2">

                            <Input type="text" name="term" placeholder="Search a costumer" />
                            <Button type="submit" variant="outline">
                                Search
                            </Button>

                            <Select name="status">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="UNPAID">Unpaid</SelectItem>
                                    <SelectItem value="PAID">Paid</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit" variant="outline">
                                Go
                            </Button>
                        </div>
                    </form>


                    {user?.role === "ADMIN" ? <div className="flex space-x-2">
                        <CostPerCubic />
                        <GenerateBillsButton />
                    </div> : null}
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl w-full md:min-h-min mt-2 space-y-2">
                    <h2 className="text-2xl font-light">Billing</h2>
                    {billsData ? ( // Conditionally render the table
                        <BillTable bills={billsData.bills} cost={cost?.costperMeter || 0} /> // Pass bills as prop
                    ) : (
                        <div>{"Error loading bills."}</div> // Display error message
                    )}
                </div>
            </div>
        </div>
    )
}