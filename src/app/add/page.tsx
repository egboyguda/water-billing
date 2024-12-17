import { DialogUser } from "@/components/addUser/addUser";
import { SearchForm } from "@/components/search-form";
import { Button } from "@/components/ui/button";

export default function Add() {
    return (
        <div className="m-4">
            <p>Users</p>
            <div className="flex justify-between ">
                <div className="items-center flex">
                    <SearchForm />
                    <Button variant={'default'}>Search User</Button>
                </div>
                <div><DialogUser /></div>
            </div>

        </div >
    );
}