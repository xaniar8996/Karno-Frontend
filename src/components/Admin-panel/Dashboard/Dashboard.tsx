import TopTemplates from "./charts/TopTemplates"
import UsersStatus from "./charts/UsersStatus"
import TopReports from "./TopReports/TopReports"

export default function Dashboard() {
    return (
        <div className="w-full h-auto text-white mt-5 flex flex-col justify-center items-start gap-5">
            <h1 className="text-4xl">داشبورد</h1>
            <div className="w-full h-auto">
                <TopReports />
            </div>
            <div className="w-full  h-1 bg-gray-800 rounded-full" />
            {/* charts */}
            <div className="w-full h-auto flex flex-row justify-center items-center">
                <div className="w-full h-auto px-14 flex flex-col justify-center items-center gap-5">
                <h2>تعداد کاربران احراز هویت شده / نشده</h2>
                    <UsersStatus />
                </div>
                <div className="w-full h-auto flex flex-col justify-center items-start gap-5">
                    <h2>محبوب ترین قالب ها</h2>
                    <TopTemplates/>
                </div>
            </div>
        </div>
    )
}

