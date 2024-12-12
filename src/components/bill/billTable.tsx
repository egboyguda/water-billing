import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "@/components/ui/button";

interface BillWithUsageAndProfileName {
  id: string;
  userId: string;
  amount: number;
  dueDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  billingMonth: Date;
  totalUsage: number;
  profileName: string;
}

interface BillTableProps {
  bills: BillWithUsageAndProfileName[] | null | undefined;
}

export default function BillTable({ bills }: BillTableProps) {
  if (!bills || bills.length === 0) {
    return <div>No bills found.</div>;
  }

  return (
    <Table className="bg-slate-50 rounded border-2">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Previous Usage (m3)</TableHead>
          <TableHead>Cost Per Cubic</TableHead>
          <TableHead>Total Bill</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Total Usage(m3)</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bills.map((bill) => (
          <TableRow key={bill.id}>
            <TableCell className="font-medium">{bill.profileName}</TableCell>
            <TableCell>{"Previous Usage is not implemented yet"}</TableCell>
            <TableCell>{"Cost Per Cubic is not implemented yet"}</TableCell>
            <TableCell>Php {bill.amount.toFixed(2)}</TableCell>
            <TableCell>{bill.dueDate.toLocaleDateString()}</TableCell>
            <TableCell>{bill.status}</TableCell>
            <TableCell>{bill.totalUsage}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}