import Search from "@/components/common/search"
import { AddCotumerModal } from "@/components/costomer/addCotumerModal"
import CusTable from "@/components/costomer/cusTable"
import { searchCustomer } from "@/db/queries/getCustomer"

import { redirect } from "next/navigation"

export default async function Page(props: { searchParams: Promise<{ term: string, category: string }> }) {

    const searchParams = await props.searchParams
    const term = searchParams.term
    if (!term) {
        redirect("/")
    }
    return (
        <div>
            <div className="m-4 mt-20 space-y-4">
                <div className="flex justify-between">
                    <Search />
                    <AddCotumerModal />
                </div>

                <div className="min-h-[100vh] flex-1 rounded-xl w-full md:min-h-min mt-2 space-y-2">
                    <h2 className="text-2xl font-light">List of Customers</h2>
                    <CusTable fetchData={() => searchCustomer(term)} />
                </div>
            </div>
        </div>
    )

}