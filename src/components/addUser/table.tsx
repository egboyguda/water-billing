import { getUserAdminManagerCollector } from "@/db/queries/getUser";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "@/components/ui/button"; // Import your Button component

export default async function Usertable() {
    const usersResult = await getUserAdminManagerCollector();

    if (!usersResult.success) {
        return <div>Error: {usersResult.message}</div>; // Handle errors
    }

    const users = usersResult.users;

    if (!users || users.length === 0) {
        return <div>No users found.</div>; // Handle empty data
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">List Of Users</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => ( // Map over the users array
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="outline">Edit</Button> {/* Use Button component */}
                                    <Button variant="destructive">Delete</Button> {/* Use Button component */}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}