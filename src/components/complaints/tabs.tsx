import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ComplaintsTabs() {
    return (<div className="m-4"><Tabs defaultValue="pending" className="w-[400px]">
        <TabsList>
            <TabsTrigger value="pending">Pending Complaints</TabsTrigger>
            <TabsTrigger value="completed">Completed Complaints</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">Show table for pending complaints</TabsContent>
        <TabsContent value="completed">Show table for completed complaints</TabsContent>
    </Tabs></div>)
}