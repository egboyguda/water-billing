export default function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-purple-600 flex flex-col justify-center items-center" >
                    <div className="text-white text-center ">
                        <h1 className="text-4xl font-bold">Pending Payments</h1>
                        <p className="text-3xl font-medium">0</p>
                    </div>
                </div>
            </div>

        </div>
    )
}