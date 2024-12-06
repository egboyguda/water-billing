import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Page() {
    return (<div className="m-4"><div className="min-h-[100vh] flex-1 rounded-xl  w-full   md:min-h-min mt-2 space-y-2" >
        <h2 className="text-2xl  font-light">Dummy Name</h2>
        <Table className="bg-slate-50  rounded border-2">
            <TableHeader>
                <TableRow>

                    <TableHead>Previes Usage (m3)</TableHead>
                    <TableHead>Curren Reading</TableHead>
                    <TableHead>Cost Per Cubic</TableHead>
                    <TableHead >Total Bill</TableHead>
                    <TableHead >Due Date</TableHead>
                    <TableHead >Payment Status</TableHead>
                    <TableHead >Pay</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">20</TableCell>
                    <TableCell>102</TableCell>
                    <TableCell>23</TableCell>
                    <TableCell>Php 2013.00</TableCell>
                    <TableCell>12/23/24</TableCell>
                    <TableCell>pending</TableCell>
                    <TableCell>Pay</TableCell>

                </TableRow>
            </TableBody>
        </Table>


    </div></div>)
}