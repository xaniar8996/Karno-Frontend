import UsersAuth from "@components/admin-panel/Dashboard/TopReports/UsersAuth"
import UsersNumber from "@components/admin-panel/Dashboard/TopReports/UsersNumbers"
import CVNumbers from "@components/admin-panel/Dashboard/TopReports/CVNumbers"

export default function TopReports() {
    return (
        <div className="w-full h-auto">
            <UsersNumber />
            <UsersAuth />
            <CVNumbers />
        </div>
    )
}