'use client'
import { useActionState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddCost } from "@/actions/addCost";
import { errors } from "jose";

export default function CostPerCubic() {
    const [formState, action, isPending] = useActionState(AddCost.bind(null), { errors: {} })
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button className="bg-green-600 text-white hover:bg-green-700">Cost per Cubic Meter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={action}>
                    <DialogHeader>
                        <DialogTitle>Set Cost per Cubic Meter</DialogTitle>
                        <DialogDescription>
                            Enter the new cost per cubic meter of water.
                        </DialogDescription>
                    </DialogHeader>
                    {formState.errors._form && <p className="text-red-500 mt-2">{formState.errors._form}</p>}
                    <div className="grid gap-4 py-4">
                        <Input
                            name="cost"
                            placeholder="Cost per cubic meter"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">

                        <Button type="submit" >{isPending ? 'Saving...' : 'Save Changes'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}