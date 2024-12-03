import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HomeIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-blue-500 flex justify-center flex-col items-center" >
          <div className="text-white text-center ">
            <h1 className="text-4xl font-bold">Costumer</h1>
            <p className="text-3xl font-medium">0</p>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-purple-600 flex flex-col justify-center items-center" >
          <div className="text-white text-center ">
            <h1 className="text-4xl font-bold">Pending Payments</h1>
            <p className="text-3xl font-medium">0</p>
          </div>
        </div>
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl md:w-1/2 w-full   md:min-h-min mt-2" >
        <h2 className="text-2xl  font-light">Payments</h2>
        <Table className="bg-slate-50  rounded border-2">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Dummy Account</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>


      </div>
    </div>
  );
}
