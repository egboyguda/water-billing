'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useActionState } from "react"
import { addUserAction } from "@/actions/addUser"
import { editAdminUserAction } from "@/actions/editAdminUser"

interface AddUserProps {
    userId: string;
    username: string;

}
export function DialogUser({ userId, username }: AddUserProps) {
    const [formState, action, isPending] = useActionState(editAdminUserAction.bind(null, userId), { errors: {} })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Edit Users. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form action={action}>
                    <div className="grid gap-4 py-4">

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                username
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                defaultValue={username}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"

                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password1" className="text-right">
                                Retype Password
                            </Label>
                            <Input
                                id="password1"
                                type="password"
                                name="password1"

                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Select User Type
                            </Label>
                            <Select name="category">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="User type" />

                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                    <SelectItem value="MANAGER">Manager</SelectItem>
                                    <SelectItem value="COLLECTOR">Collector</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </div >
                    <DialogFooter>
                        <Button type="submit">{isPending ? "Loading..." : "Save changes"}</Button>
                        {formState.errors._form && <p className="text-red-500">{formState.errors._form}</p>}
                        {formState.errors.username && <p className="text-red-500">{formState.errors.username}</p>}
                        {formState.errors.password && <p className="text-red-500">{formState.errors.password}</p>}
                        {formState.errors.password1 && <p className="text-red-500">{formState.errors.password1}</p>}
                        {formState.errors.category && <p className="text-red-500">{formState.errors.category}</p>}
                    </DialogFooter>
                </form>
            </DialogContent >
        </Dialog >
    )
}
