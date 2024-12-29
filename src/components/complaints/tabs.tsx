import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getComplaint } from "@/db/queries/getComplaint";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { verifySession } from "@/lib/dal";
import ChangeStatusDialogComplaint from "./dialog";

export default async function ComplaintsTabs() {
    const complaints = await getComplaint();
    const session = await verifySession();

    const pendingComplaints = complaints?.filter((complaint) => complaint.status === "PENDING");
    const completedComplaints = complaints?.filter((complaint) => complaint.status === "RESOLVED");

    return (
        <div className="m-4">
            <Tabs defaultValue="pending" className="w-full">
                <TabsList>
                    <TabsTrigger value="pending">Pending Complaints</TabsTrigger>
                    <TabsTrigger value="completed">Completed Complaints</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                    {pendingComplaints && pendingComplaints.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {session?.role === "ADMIN" ? <TableHead>User Name</TableHead> : null}
                                    <TableHead>Issue</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingComplaints.map((complaint) => (
                                    <TableRow key={complaint.id}>

                                        {session?.role === "ADMIN" ? (
                                            <TableCell>{complaint.profile.name}</TableCell>
                                        ) : null}
                                        <TableCell>{complaint.name}</TableCell>
                                        <TableCell>{complaint.description}</TableCell>
                                        <TableCell><span className="bg-yellow-500 p-2 text-white rounded-sm">{complaint.status}</span></TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <ChangeStatusDialogComplaint Id={complaint.id} />
                                                <button className="btn bg-white p-2 rounded border">Delete</button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No pending complaints available.</p>
                    )}
                </TabsContent>
                <TabsContent value="completed">
                    {completedComplaints && completedComplaints.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {completedComplaints.map((complaint) => (
                                    <TableRow key={complaint.id}>
                                        <TableCell>{complaint.name}</TableCell>
                                        <TableCell>{complaint.description}</TableCell>
                                        <TableCell>{complaint.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No completed complaints available.</p>
                    )}
                </TabsContent>
            </Tabs>
        </div >
    );
}
