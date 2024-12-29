import SMSForm from "@/components/sms/sms-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function SMSPage() {
    return (
        <div className="space-y-6 mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Send SMS Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <SMSForm />
                </CardContent>
            </Card>

        </div>
    )
}

