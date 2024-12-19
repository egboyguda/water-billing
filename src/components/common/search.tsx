'use client'

import { search } from "@/actions/search"
import { useSearchParams } from "next/navigation"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export default function Search() {
    const searchParams = useSearchParams()
    return (<div>
        <form action={search}>

            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Search a customer" defaultValue={searchParams.get("term") || ""} name="term" />
                <Button type="submit" variant='outline'>Search</Button>
            </div>

        </form></div>)
}