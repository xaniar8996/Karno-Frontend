"use client";
import Loading from "@app/loadings/loading";
import UserStore from "@Store/UserStore";
import { useMemo, useState } from "react";
import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import UserCVs from "./UserCVs";
import { CiBellOn } from "react-icons/ci";
import { useModal } from "@hooks/ui/useModal";
import NotificationsInboxModal from "@components/modal/UserModal/InboxModal";
import ChangePassword from "@components/modal/UserModal/verifyResetPassword";
import { FaLock } from "react-icons/fa";

export default function Profile() {
    const GetUser = UserStore((state) => state?.GetUser);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openNotificationsModal = useModal();
    const openChangePasswordModal = useModal();

    const { data: userData, isLoading } = useAPIQuery({
        key: ["User"],
        queryFn: GetUser,
    });

    const userInitial = useMemo(
        () => (userData?.Fullname ? userData.Fullname.charAt(0) : "Guest"),
        [userData?.Fullname]
    );

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Glows */}
            <div className="pointer-events-none absolute -left-24 top-[-8rem] h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />

            {/* Main layout */}
            <div className="relative flex w-full max-w-6xl flex-col gap-6 px-4 md:flex-row md:px-6 -mt-24">
                {/* Profile + resumes card */}
                <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-[0_20px_90px_rgba(15,23,42,0.9)] md:p-7">
                    {/* Header */}
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 rounded-2xl border border-white/30 bg-slate-900/80 p-[3px]">
                                <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-lg font-semibold text-white">
                                    {userInitial}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-base font-semibold tracking-tight text-white md:text-lg">
                                    {userData?.Fullname}
                                </h2>
                                <p className="mt-0.5 text-xs text-slate-300/80 md:text-sm">
                                    همه رزومه‌های ذخیره شده در یک نگاه
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setDrawerOpen(true)}
                            className="inline-flex items-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-slate-100 backdrop-blur transition hover:bg-white/15 md:px-4"
                        >
                            <span className="h-1 w-1 rounded-full bg-emerald-400" />
                            منو
                        </button>
                    </div>

                    {/* User info pill */}
                    <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-xs text-slate-200 md:text-sm">
                        <span className={`rounded-xl ${userData?.isAccountVerified ? "bg-emerald-500/10" : "bg-red-500/10"} px-3 py-1 text-[11px] font-medium ${userData?.isAccountVerified ? "text-emerald-300" : "text-red-300"}`}>
                            {userData?.isAccountVerified ? "تایید شد" : "ایمیل تایید نشده"}
                        </span>
                        <span className="text-slate-300/90">{userData?.email ?? "guest@gmail.com"}</span>
                    </div>

                    {/* Resumes list */}
                    <div className="mb-3 flex items-center justify-start gap-2">
                        <span className="h-1 w-1 rounded-full bg-emerald-400" />
                        <h3 className="text-sm font-semibold text-white md:text-base">
                            رزومه‌های من
                        </h3>
                    </div>
                    <UserCVs userData={userData ?? null} />
                </div>

                {/* Drawer for other sections (desktop: side panel, mobile: overlay) */}
                <div
                    className={`fixed inset-y-0 right-0 z-30 w-64 transform border-l border-white/10 bg-slate-950/95 px-5 py-6 text-xs text-slate-100 backdrop-blur-2xl shadow-[0_0_60px_rgba(15,23,42,0.9)] transition-transform duration-300 md:static md:z-0 md:h-auto md:w-64 md:translate-x-0 md:rounded-3xl md:border md:bg-white/5 md:py-5 ${drawerOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
                        }`}
                >
                    {/* Close on mobile */}
                    <div className="mb-5 flex items-center justify-between md:mb-4">
                        <span className="text-[11px] font-semibold tracking-wide text-slate-300/90">
                            منو پروفایل
                        </span>
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="rounded-xl bg-white/5 px-2 py-1 text-[11px] text-slate-200 hover:bg-white/10 md:hidden"
                        >
                            بستن
                        </button>
                    </div>

                    <div className="space-y-2 text-[11px] md:text-xs">
                        <button className="flex w-full items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-left font-medium text-emerald-300">
                            رزومه‌های من
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-200">
                                فعال
                            </span>
                        </button>
                        <button
                            onClick={openNotificationsModal?.open}
                            className="flex w-full items-center justify-between rounded-xl cursor-pointer active:scale-95 transition-all bg-white/5 px-3 py-2 text-left text-slate-200 hover:bg-white/10">
                            نوتیفیکیشن ها
                            <div className="w-auto relative">
                                <span className="bg-red-500 w-2 h-2 absolute left-3 rounded-full" />
                                <CiBellOn className="text-xl cursor-pointer" />
                            </div>
                        </button>
                        <button
                        onClick={openChangePasswordModal?.open}
                        className="flex w-full items-center justify-between rounded-xl cursor-pointer bg-white/5 px-3 py-2 text-left text-slate-200 hover:bg-white/10">
                            تغییر رمز عبور
                            <span className="text-[10px] text-slate-400">
                                <FaLock />
                            </span>
                        </button>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-4">
                        <button className="w-full rounded-xl bg-red-500/10 px-3 py-2 text-[11px] font-medium text-red-300 hover:bg-red-500/15">
                            خروج از حساب
                        </button>
                    </div>
                </div>
            </div>
            {openNotificationsModal.isOpen && (
                <NotificationsInboxModal onClose={openNotificationsModal.close} />
            )}
            {openChangePasswordModal.isOpen && (
                <ChangePassword onClose={openChangePasswordModal.close} />
            )}
        </div>
    );
}