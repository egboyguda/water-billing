import { SidebarTrigger } from "../ui/sidebar";

export default function Navbar() {
    return (
        <div className="border-b-2 shadow-sm p-2 flex w-full">
            <SidebarTrigger />
            <h1 className="text-2xl pl-2 font-bold w-full">Water Billing Management</h1>
        </div>
    );
}