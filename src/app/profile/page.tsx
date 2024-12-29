import ProfilePage from "@/components/profile/profilePage";
import { getUniqueCustomers } from "@/db/queries/getCustomer";

function toTitleCase(str: string | undefined): string {
    if (!str) return ""; // Handle null or undefined input

    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

export default async function Page() {
    const user = await getUniqueCustomers();

    if (!user) {
        return <div>User not found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <ProfilePage
                name={toTitleCase(user.profile?.name)}
                username={user.username}
                email={user.email ?? ""}
                contactNum={user.profile?.phoneNumber ?? ""}
                address={toTitleCase(user.profile?.address)}
                userId={user.id}
                apikey={user.apiKey?.key ?? ""}
            />
        </div>
    );
}