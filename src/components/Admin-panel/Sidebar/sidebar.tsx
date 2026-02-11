"use client"
import { Sidebar_Data } from "@data/Admin-data";
import { atom, useAtom } from "jotai";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

export const page = atom("dashboard");

export default function Sidebar() {
    const [currentPage, setCurrentPage] = useAtom(page);

    return (
        <div className="w-full h-auto flex justify-start items-center transition-all p-2">
            <div className="w-72 h-auto bg-slate-800/40 backdrop-blur-xl flex flex-col justify-start items-center gap-12 py-8 px-5 transition-all rounded-2xl">
                <div className="h-auto w-full flex flex-row justify-between items-center pb-3 border-b-2 border-gray-700">
                    <h2 className="text-white text-2xl">پنل ادمین <strong className="text-green-400">کارنو</strong></h2>
                    <MdAdminPanelSettings className="text-white text-4xl" />
                </div>
                <div className="w-full h-auto flex flex-col justify-center items-center gap-1">
                    {Sidebar_Data.map((data, idx) => (
                        <div
                            key={idx}
                            className={`w-full h-auto flex flex-row justify-start items-center gap-3 text-white text-lg cursor-pointer
                             py-2 px-2 rounded-xl transition-all active:scale-95 hover:bg-gray-900 ${currentPage === data?.key ? "bg-green-900/40" : "none"}`}
                            onClick={() => setCurrentPage(data?.key)}
                        >
                            {data?.icon && <data.icon />}
                            <h6>{data?.title}</h6>
                            <MdKeyboardArrowLeft className="text-gray-600" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}