'use client'
// components/bill/billTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { generatePDF } from "@/utils/generatePdf";
// Import the function
interface BillWithUsageAndProfileName {
    // Correct Interface
    id: string;
    userId: string;
    amount: number;
    dueDate: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    billingMonth: Date;
    totalUsage: number;
    profileName: string; // Include profileName
}
interface BillTableProps {
    bills: BillWithUsageAndProfileName[] | null | undefined;
    cost: number
}

export default function BillTable({ bills, cost }: BillTableProps) {
    if (!bills || bills.length === 0) {
        return <div>No bills found.</div>;
    }

    return (
        <Table className="bg-slate-50 rounded border-2">
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Previous Usage (m3)</TableHead>
                    <TableHead>Cost Per Cubic (Php)</TableHead>
                    <TableHead>Total Bill (Php)</TableHead>
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
                        <TableCell>{"Previous Usage Logic Not Implemented"}</TableCell>
                        <TableCell>{cost}</TableCell>
                        <TableCell>Php {bill.amount.toFixed(2)}</TableCell>
                        <TableCell>{bill.dueDate.toLocaleDateString()}</TableCell>
                        <TableCell>{bill.status}</TableCell>
                        <TableCell>{bill.totalUsage}</TableCell>
                        <TableCell>
                            <div className="flex gap-2">

                                <Button onClick={() => generatePDF(bill, cost)}>Download Invoice</Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}