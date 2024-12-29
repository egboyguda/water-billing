'use client'
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { updateComplaintAction } from "@/actions/updateComplaint";


interface ChangeStatusDialogComplaintProps {
    Id: string;
}
export default function ChangeStatusDialogComplaint({ Id }: ChangeStatusDialogComplaintProps) {
    const [formState, action, isPending] = useActionState(updateComplaintAction.bind(null, Id), { errors: {} });
    return (
        <Dialog>
            <DialogTrigger className="btn bg-white p-2 rounded border"> Change Status</DialogTrigger>
            <DialogContent>
                <form action={action}>
                    <DialogHeader >
                        <DialogTitle>Update  Status</DialogTitle>
                        <DialogDescription className="space-y-4 pt-2">

                            <Select name="status">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Change Complaint Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">PENDING</SelectItem>
                                    <SelectItem value="RESOLVED">RESOLVED</SelectItem>

                                </SelectContent>
                            </Select>
                            <Textarea placeholder="Remarks" name="remarks" />
                            <Button variant="default" type="submit">{isPending ? "Loading..." : "Update"}</Button>
                            {formState.errors.status && <p className="text-red-500">{formState.errors.status}</p>}
                            {formState.errors.remarks && <p className="text-red-500">{formState.errors.remarks}</p>}
                            {formState.errors._form && <p className="text-red-500">{formState.errors._form}</p>}
                        </DialogDescription>
                    </DialogHeader>
                </form>
            </DialogContent>
        </Dialog>
    );
}