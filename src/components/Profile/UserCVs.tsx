import { MiniLoader } from "@app/loadings/loading";
import { useAPIQuery } from "@hooks/useAPIQuery";
import { NextAPI } from "@lib/axios";
import { UsersTypes } from "@Types/UserStore";
import Link from "next/link";
import { useMemo } from "react";
import toast from "react-hot-toast";

interface UserDataTypes {
    userData: UsersTypes | null
}

export default function UserCVs({ userData }: UserDataTypes) {

    const { data: userCV, isLoading: cvLoading } = useAPIQuery({
        key: ["UserCV"],
        queryFn: async () => {
            try {
                const CVResponse = await NextAPI.get("/api/CV/userCV");
                return CVResponse?.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        enabled: Boolean(userData),
    });

    const resumeList = useMemo(() => userCV?.data || [], [userCV]);


    return (

        <div className="space-y-3">
            {cvLoading ? (
                <div className="w-full h-auto flex justify-center items-center">
                    <MiniLoader />
                </div>
            ) : resumeList.length ? (
                resumeList.map((resume: any, index: number) => (
                    <div
                        key={resume._id || index}
                        className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-100 backdrop-blur transition hover:border-emerald-400/60 hover:bg-white/10 md:px-5 md:py-3.5 md:text-sm"
                    >
                        <div className="flex flex-1 items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 text-[11px] font-semibold text-slate-100 md:text-xs">
                                {index + 1}
                            </div>
                            <div>
                                <p className="font-medium text-white">{resume?.template || "بدون نام"}</p>
                                <p className="mt-0.5 text-[11px] text-slate-300/80 md:text-xs">
                                    {resume?.personal?.jobTitle || resume?.personal?.fullName || "رزومه"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] md:text-xs">
                            <Link href={`/CV/view?id=${resume._id}&tpl=${resume.template}`}>
                                <button className="rounded-xl bg-white/10 px-3 py-1.5 text-slate-100 transition hover:bg-white/20 cursor-pointer">
                                    مشاهده
                                </button>
                            </Link>
                            <Link href={`/CV?tpl=${resume.template}&editId=${resume._id}`}>
                                <button className="rounded-xl cursor-pointer bg-emerald-500/90 px-3 py-1.5 font-semibold text-slate-950 shadow-[0_6px_20px_rgba(16,185,129,0.55)] transition hover:brightness-110">
                                    ویرایش
                                </button>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full h-auto flex justify-center text-red-400">رزومه‌ای یافت نشد.</div>
            )}
        </div>
    )
}