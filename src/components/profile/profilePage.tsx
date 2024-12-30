
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditProfileForm from './formProfile'
interface Profile {
    name: string;
    email: string;
    username: string;
    contactNum: string;
    address?: string;
    apikey: string;
    userId: string;
}

export default function ProfilePage({ username, email, contactNum, address, userId, apikey, name }: Profile) {
    // In a real application, you would fetch this data from an API or database



    return (
        <div className="container mx-auto p-4">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center ">

                        <div>
                            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
                            <p className="text-gray-500">{email}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Username</h3>
                            <p>{username}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Address</h3>
                            <p>{address}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Contact Number</h3>
                            <p>{contactNum}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">API Key</h3>
                            <p>{apikey}</p>

                        </div>
                        <EditProfileForm name={name} username={username} email={email} contactNum={contactNum} address={address} userId={userId} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

