import SidabarNav from "@/components/common/sidabar";
import { AddCotumerModal } from "@/components/costomer/addCotumerModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Costumer() {
    return (
        <SidabarNav>  <div className="m-4 mt-20 space-y-4">

            <div className="flex justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" placeholder="Search a costumer" />
                    <Button type="submit" variant='outline'>Search</Button>
                </div>

                <AddCotumerModal />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl  w-full   md:min-h-min mt-2 space-y-2" >
                <h2 className="text-2xl  font-light">List of Costumer&apos;s</h2>
                <Table className="bg-slate-50  rounded border-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Contact Number</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Dummy Account</TableCell>
                            <TableCell>0912323232</TableCell>
                            <TableCell>123 Main Street, New York, NY 10010</TableCell>
                            <TableCell className="space-x-2">
                                <Button type="submit" className="bg-blue-600">Edit</Button>
                                <Button type="submit" className="bg-red-700">Delete</Button>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>


            </div>
        </div></SidabarNav>)
}