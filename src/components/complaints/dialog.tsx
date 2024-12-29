'use client'
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { updatePaymentAction } from "@/actions/updatePayment";

interface ChangeStatusDialogComplaintProps {
    Id: string;
}
export default function ChangeStatusDialogComplaint({ Id }: ChangeStatusDialogComplaintProps) {

    return (
        <Dialog>
            <DialogTrigger className="btn bg-white p-2 rounded border"> Change Status</DialogTrigger>
            <DialogContent>
                <form>
                    <DialogHeader >
                        <DialogTitle>Update  Status</DialogTitle>
                        <DialogDescription className="space-y-4 pt-2">

                            <Select name="status">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Change Complaint Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PAID">PENDING</SelectItem>
                                    <SelectItem value="UNPAID">Resolved</SelectItem>

                                </SelectContent>
                            </Select>
                            <Textarea placeholder="Remarks" name="remarks" />
                            <Button variant="default" type="submit">Save changes</Button>

                        </DialogDescription>
                    </DialogHeader>
                </form>
            </DialogContent>
        </Dialog>
    );
}