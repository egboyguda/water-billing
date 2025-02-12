import { DialogUser } from "@/components/addUser/addUser";
import Search from "@/components/addUser/search-user";
import Usertable from "@/components/addUser/table";



export default function Add() {
    return (
        <div className="m-4 mt-10 space-y-6">

            <div className="flex justify-between ">
                <div className="items-center flex">
                    <Search />

                </div>
                <div><DialogUser /></div>


            </div>
            <Usertable />

        </div >
    );
}