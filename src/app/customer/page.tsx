import { deleteUserAction } from "@/actions/editUser";
import Search from "@/components/common/search";
import { AddCotumerModal } from "@/components/costomer/addCotumerModal";
import DeleteBtn from "@/components/costomer/deletebtn";
import EditDialog from "@/components/costomer/editDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCustomer } from "@/db/queries/getCustomer";

export default async function Costumer() {
    const customers = await getCustomer();  // Fixed typo 'customners' to 'customers'

    return (
        <div className="m-4 mt-20 space-y-4">
            <div className="flex justify-between">
                <Search />
                <AddCotumerModal />
            </div>

            <div className="min-h-[100vh] flex-1 rounded-xl w-full md:min-h-min mt-2 space-y-2">
                <h2 className="text-2xl font-light">List of Customers</h2>

                <Table className="bg-slate-50 rounded border-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Contact Number</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {customers && customers.length > 0 ? (
                            customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    {/* Check if profile exists */}
                                    <TableCell className="font-medium">
                                        {customer.profile ? customer.profile.name : "No Name"}
                                    </TableCell>
                                    <TableCell>
                                        {customer.profile ? customer.profile.phoneNumber : "No Phone Number"}
                                    </TableCell>
                                    <TableCell>
                                        {customer.profile ? customer.profile.address : "No Address"}
                                    </TableCell>
                                    <TableCell className="space-x-2">
                                        <EditDialog name={customer.profile?.name || ""} username={customer.username || ""} email={customer?.email || ""} contactNum={customer.profile?.phoneNumber || ""} address={customer.profile?.address || ""} apikey={customer.apiKey?.key || ""} userId={customer.id} />
                                        <DeleteBtn userId={customer.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
                                    No customers found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </div>
        </div>
    );
}
