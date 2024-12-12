import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

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

export const generatePDF = (bill: BillWithUsageAndProfileName) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Invoice for ${bill.profileName}`, 10, 10);

  doc.setFontSize(12);
  doc.text(`Bill ID: ${bill.id}`, 10, 20);
  doc.text(`Due Date: ${bill.dueDate.toLocaleDateString()}`, 10, 30);
  doc.text(`Total Usage: ${bill.totalUsage} m3`, 10, 40);
  doc.text(`Total Amount: Php ${bill.amount.toFixed(2)}`, 10, 50);

  const tableData = [
    ["Previous Usage", "Not implemented yet"],
    ["Current Reading", bill.totalUsage],
    ["Cost Per Cubic", "Not implemented yet"],
    ["Total Bill", `Php ${bill.amount.toFixed(2)}`],
  ];

  autoTable(doc, {
    head: [["Description", "Value"]],
    body: tableData,
    startY: 60,
  });

  doc.save(`invoice_${bill.id}.pdf`);
};
