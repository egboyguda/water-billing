import { DialogUser } from "@/components/addUser/addUser";
import Usertable from "@/components/addUser/table";
import { SearchForm } from "@/components/search-form";
import { Button } from "@/components/ui/button";

export default function Add() {
    return (
        <div className="m-4 mt-10 space-y-6">

            <div className="flex justify-between ">
                <div className="items-center flex">
                    <SearchForm />
                    <Button variant={'default'}>Search User</Button>
                </div>
                <div><DialogUser /></div>


            </div>
            <Usertable />

        </div >
    );
}