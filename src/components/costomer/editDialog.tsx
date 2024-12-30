"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";
import { editUserAction } from "@/actions/editUser";
interface EditDialogProps {
    name: string;
    username: string;
    userId: string;
    email: string;
    contactNum: string;
    address: string;
    apikey: string;

}

export default function EditDialog({ name, username, email, contactNum, address, userId, apikey }: EditDialogProps) {
    const [formState, action, isPending] = useActionState(editUserAction.bind(null, userId), { errors: {} })
    const handleCopyApiKey = () => {
        navigator.clipboard.writeText(apikey)
            .then(() => {
                console.log("API Key copied to clipboard!"); // Optional success message
            })
            .catch((err) => {
                console.error("Failed to copy API Key:", err); // Optional error handling
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-600 text-white">
                    Edit Profile
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form action={action}>
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input name="name" id="name" defaultValue={name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" name="username" defaultValue={username} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input type="password" name="password" id="password" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password1" className="text-right">
                                Retype Password
                            </Label>
                            <Input type="password" name="password1" id="password1" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input type="email" name="email" defaultValue={email} id="email" className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contactNum" className="text-right">
                                Contact Number
                            </Label>
                            <Input id="contactNum" name="contactNum" defaultValue={contactNum} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                                Address
                            </Label>
                            <Textarea id="address" name="address" defaultValue={address} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="apikey" className="text-right">
                                ApiKey
                            </Label>
                            <Input
                                disabled
                                id="apikey"
                                defaultValue={apikey}
                                className="col-span-3"
                            />
                            <Button onClick={handleCopyApiKey} variant="outline" type="button">Copy API Key</Button>
                        </div>
                    </div>
                    {formState.errors._form && <p className="text-red-500 text-sm ">{formState.errors._form}</p>}
                    {formState.errors.username && <p className="text-red-500 text-sm ">{formState.errors.username}</p>}
                    {formState.errors.password && <p className="text-red-500 text-sm ">{formState.errors.password}</p>}
                    {formState.errors.password1 && <p className="text-red-500 text-sm ">{formState.errors.password1}</p>}
                    {formState.errors.email && <p className="text-red-500 text-sm ">{formState.errors.email}</p>}
                    {formState.errors.contactNum && <p className="text-red-500 text-sm ">{formState.errors.contactNum}</p>}
                    {formState.errors.address && <p className="text-red-500 text-sm ">{formState.errors.address}</p>}
                    <DialogFooter>

                        <Button type="submit">{isPending ? 'Submitting ...' : 'Submit'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog >
    );
}
