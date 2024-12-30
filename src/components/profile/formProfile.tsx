'use client'

import { useActionState, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { editUserAction } from '@/actions/editUser'
interface Profile {
    name: string;
    email: string;
    username: string;
    contactNum: string;
    address?: string;

    userId: string;
}
export default function EditProfileForm({ name, username, email, contactNum, address, userId }: Profile) {
    const [isEditing, setIsEditing] = useState(false)
    const [formState, action, isPending] = useActionState(editUserAction.bind(null, userId), { errors: {} })

    if (!isEditing) {
        return (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )
    }

    return (
        <form action={action} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name='name' defaultValue={name.toLocaleLowerCase()} />
            </div>
            <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" name='username' defaultValue={username} />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name='email' defaultValue={email} type='email' />
            </div>
            <div>
                <Label htmlFor="address">Location</Label>
                <Input id="address" defaultValue={address} name='address' />
            </div>
            <div>
                <Label htmlFor="contactNum">Contact Number</Label>
                <Input id="contactNum" name='contactNum' defaultValue={contactNum} />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name='password' type='password' placeholder='leave blank if you dont want to change it' />
            </div>
            <div>
                <Label htmlFor="password1">Retype Password</Label>
                <Input id="password1" name='password1' type='password1' placeholder='leave blank if you dont want to change it' />
            </div>
            <div className="flex space-x-2">
                <Button type="submit">{isPending ? 'Submitting ...' : 'Save Changes'}</Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                {formState.errors._form && <p className="text-red-500 text-sm ">{formState.errors._form}</p>}
                {formState.errors.username && <p className="text-red-500 text-sm ">{formState.errors.username}</p>}
                {formState.errors.password && <p className="text-red-500 text-sm ">{formState.errors.password}</p>}
                {formState.errors.password1 && <p className="text-red-500 text-sm ">{formState.errors.password1}</p>}
                {formState.errors.email && <p className="text-red-500 text-sm ">{formState.errors.email}</p>}
                {formState.errors.contactNum && <p className="text-red-500 text-sm ">{formState.errors.contactNum}</p>}
                {formState.errors.address && <p className="text-red-500 text-sm ">{formState.errors.address}</p>}

            </div>
        </form>
    )
}

