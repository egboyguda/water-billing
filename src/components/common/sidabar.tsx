import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "../ui/sidebar";
import Navbar from "./navbar";
interface SidebarProps {
    children: React.ReactNode;
}
export default function SidabarNav({ children }: SidebarProps) {
    return (
        <SidebarProvider >
            <AppSidebar />
            <main className="w-full">
                <div>
                    <div className="bg-red-600">
                        <h1 className="text-sm font-bold text-center text-white">On-going Development</h1>
                    </div>
                </div>
                <Navbar />
                {children}
            </main>
        </SidebarProvider>
    )
}