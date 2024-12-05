'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { loginActions } from "@/actions/login"

export default function LoginForm() {

    const [formState, action, isPending] = useActionState(loginActions.bind(null), { errors: {} })

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your username and password to access your account.</CardDescription>
            </CardHeader>
            <form action={action} >
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="enter your username"
                            name="username"
                            required
                        />
                        {formState.errors.username && <p className="text-red-500">{formState.errors.username}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="enter your password"
                            name="password"
                            required
                        />
                        {formState.errors.password && <p className="text-red-500">{formState.errors.password}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Log in'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

