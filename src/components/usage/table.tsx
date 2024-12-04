import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function UsageTable() {
    return (<div className="min-h-[100vh] flex-1 rounded-xl w-1/2    md:min-h-min mt-5 space-y-2" >
        <h2 className="text-2xl  font-light">List of Costumer&apos;s and Thier Usage</h2>
        <Table className="bg-slate-50  rounded border-2">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Water Usage</TableHead>
                    <TableHead >Water Usage Period</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Dummy Account</TableCell>

                    <TableCell>123 Main Street, New York, NY 10010</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>March 2, 2024</TableCell>

                </TableRow>
            </TableBody>
        </Table>


    </div>);
}