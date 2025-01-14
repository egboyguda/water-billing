
import { DialogUser } from "@/components/addUser/addUser";
import Search from "@/components/addUser/search-user";
import Usertable from "@/components/addUser/table";
import { searchUser } from "@/db/queries/getUser";


import { redirect } from "next/navigation";

export default async function Add(props: { searchParams: Promise<{ term: string }> }) {
    const searchParams = await props.searchParams
    const term = searchParams.term
    if (!term) {
        redirect("/add")
    }
    return (
        <div className="m-4 mt-10 space-y-6">

            <div className="flex justify-between ">
                <div className="items-center flex">
                    <Search />

                </div>
                <div><DialogUser /></div>


            </div>
            <Usertable fetchData={() => searchUser(term)} />

        </div >
    );
}