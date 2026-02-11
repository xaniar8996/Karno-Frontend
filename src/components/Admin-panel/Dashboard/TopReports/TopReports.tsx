import UsersAuth from "./UsersAuth"
import UsersNumber from "./UsersNumbers"
import CVNumbers from "./CVNumbers"

export default function TopReports() {
    return (
        <div className="w-full h-auto flex flex-row justify-center items-center gap-5">
            <UsersNumber />
            <UsersAuth />
            <CVNumbers />
        </div>
    )
}

