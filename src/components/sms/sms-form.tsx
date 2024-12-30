'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { sendSms } from '@/actions/sendSms'

export default function SMSForm() {
    const [recipient, setRecipient] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        // Here you would typically send the SMS data to your backend
        await sendSms(recipient, message)
        console.log('SMS sent to:', recipient, 'Message:', message)
        // Reset form
        setRecipient('')
        setMessage('')
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                    id="recipient"
                    type="tel"
                    placeholder="+1234567890, or if u do not input a number, it will send to all customers"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Send SMS</Button>
        </form>
    )
}

