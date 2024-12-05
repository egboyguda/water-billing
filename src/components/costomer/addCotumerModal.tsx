'use client'
import { registerAction } from "@/actions/register"
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

import { useActionState } from "react"

export function AddCotumerModal() {
    const [formState, action, isPending] = useActionState(registerAction.bind(null), { errors: {} })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Customer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Customer</DialogTitle>
                    <DialogDescription>
                        Fillup the following to add Customer. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form action={action}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="enter your name"
                                className="col-span-3"
                                name="name"
                            />
                            {formState.errors.name && <p className="text-red-500 text-sm ">{formState.errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                placeholder="enter email address"
                                className="col-span-3"
                                name="email"
                            />

                        </div>
                        {formState.errors.email && <p className="text-red-500 text-sm ">{formState.errors.email}</p>}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contact" className="text-right">
                                Contact Number
                            </Label>
                            <Input
                                id="contact"
                                placeholder="enter contact number"
                                className="col-span-3"
                                name="contact"
                            />

                        </div>
                        {formState.errors.contact && <p className="text-red-500 text-sm ">{formState.errors.contact}</p>}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                                Address
                            </Label>
                            <Input
                                id="address"
                                placeholder="enter your address"
                                className="col-span-3"
                                name="address"
                            />

                        </div>
                        {formState.errors.address && <p className="text-red-500 text-sm ">{formState.errors.address}</p>}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                placeholder="enter your username"
                                className="col-span-3"
                                name="username"

                            />
                            {formState.errors.username && <p className="text-red-500 text-sm ">{formState.errors.username}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="enter your password"
                                className="col-span-3"
                                name="password"
                            />
                            {formState.errors.password && <p className="text-red-500 text-sm ">{formState.errors.password}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password1" className="text-right">
                                Retype Password
                            </Label>
                            <Input
                                type="password"
                                id="password1"
                                name="password1"
                                placeholder="reenter your password"
                                className="col-span-3"
                            />

                        </div>
                    </div>
                    <DialogFooter>

                        <Button type="submit">{isPending ? 'Submitting ...' : 'Submit'}</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}