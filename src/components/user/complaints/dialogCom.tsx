'use client'
import { ComplainActions } from "@/actions/addComplaint";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";



export default function DialogCom() {
    const [formState, action, isPending] = useActionState(ComplainActions.bind(null), { errors: {} })
    return (

        <div className="m-4">
            <Dialog  >
                <DialogTrigger asChild>
                    <Button variant="default">Report a complaint</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form action={action}>
                        <DialogHeader>
                            <DialogTitle>Report a complaint</DialogTitle>
                            <DialogDescription>
                                Fill up the report form . Click save when you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Issue
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Description
                                </Label>
                                <Textarea name='description' placeholder="Write a description" rows={4} className="col-span-3" />
                            </div>
                        </div>
                        {formState.errors._form && <p className="text-red-500">{formState.errors._form}</p>}
                        {formState.errors.name && <p className="text-red-500">{formState.errors.name}</p>}
                        {formState.errors.description && <p className="text-red-500">{formState.errors.description}</p>}
                        <DialogFooter>
                            <Button type="submit">{isPending ? 'Saving...' : 'Save'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>

    )
}