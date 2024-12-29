'use client'
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { updatePaymentAction } from "@/actions/updatePayment";

interface ChangeStatusDialogProps {
    billId: string;
}
export default function ChangeStatusDialog({ billId }: ChangeStatusDialogProps) {
    const [formState, action, isPending] = useActionState(updatePaymentAction.bind(null, billId), { errors: {} });
    return (
        <Dialog>
            <DialogTrigger className="btn bg-white p-2 rounded border"> Change Status</DialogTrigger>
            <DialogContent>
                <form action={action}>
                    <DialogHeader >
                        <DialogTitle>Update Payment Status</DialogTitle>
                        <DialogDescription className="space-y-4 pt-2">

                            <Select name="status">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Payment Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PAID">PAID</SelectItem>
                                    <SelectItem value="UNPAID">UNPAID</SelectItem>

                                </SelectContent>
                            </Select>
                            <Textarea placeholder="Remarks" name="remarks" />
                            <Button variant="default" type="submit">{isPending ? "Loading..." : "Save changes"}</Button>
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