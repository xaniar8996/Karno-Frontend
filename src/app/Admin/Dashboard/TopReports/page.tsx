import UsersAuth from "@components/Admin-panel/Dashboard/TopReports/UsersAuth"
import UsersNumber from "@components/Admin-panel/Dashboard/TopReports/UsersNumbers"
import CVNumbers from "@components/Admin-panel/Dashboard/TopReports/CVNumbers"

export default function TopReports() {
    return (
        <div className="w-full h-auto">
            <UsersNumber />
            <UsersAuth />
            <CVNumbers />
        </div>
    )
}