
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Page() {
    return (<div>
        <div className="m-4 mt-20 space-y-4">

            <div className="flex justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" placeholder="Search a costumer" />
                    <Button type="submit" variant='outline'>Search</Button>
                </div>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl  w-full   md:min-h-min mt-2 space-y-2" >
                <h2 className="text-2xl  font-light">Billing</h2>
                <Table className="bg-slate-50  rounded border-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Previes Usage (m3)</TableHead>
                            <TableHead>Cost Per Cubic</TableHead>
                            <TableHead >Total Bill</TableHead>
                            <TableHead >Due Date</TableHead>
                            <TableHead >Payment Status</TableHead>
                            <TableHead >Total Usage(m3)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Dummy Account</TableCell>
                            <TableCell>102</TableCell>
                            <TableCell>23</TableCell>
                            <TableCell>Php 2013.00</TableCell>
                            <TableCell>12/23/24</TableCell>
                            <TableCell>pending</TableCell>
                            <TableCell>125</TableCell>

                        </TableRow>
                    </TableBody>
                </Table>


            </div>
        </div>;
    </div>);

}