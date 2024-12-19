import { SearchedCustomer } from "@/db/queries/getCustomer"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import DeleteBtn from "./deletebtn"
import EditDialog from "./editDialog"

interface CusTableProps {
    fetchData: () => Promise<SearchedCustomer[]>

}
export default async function CusTable({ fetchData }: CusTableProps) {
    const customers = await fetchData()
    return (
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
                {customers ? (
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
    )
}
