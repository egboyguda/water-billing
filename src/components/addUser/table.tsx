import { getUserAdminManagerCollector, UserData } from "@/db/queries/getUser";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
// Import your Button component
import { DialogUser } from "./dialogUser";
import DeleteBtn from "../costomer/deletebtn";

interface UserTableProps {
    fetchData?: () => Promise<UserData[]>;
}

export default async function Usertable({ fetchData }: UserTableProps) {
    let users: UserData[] = [];

    try {
        // Use fetchData if provided; otherwise, fallback to getUserAdminManagerCollector
        if (fetchData) {
            users = await fetchData();
        }

        if (!users || users.length === 0) {
            const fallbackResult = await getUserAdminManagerCollector();
            if (fallbackResult.success && fallbackResult.users) {
                users = fallbackResult.users;
            } else {
                return <div>Error: {fallbackResult.message || "Failed to fetch users."}</div>;
            }
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        return <div>Error: Failed to load user data.</div>;
    }

    if (users.length === 0) {
        return <div>No users found.</div>;
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
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <DialogUser userId={user.id} username={user.username} />
                                    <DeleteBtn userId={user.id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
