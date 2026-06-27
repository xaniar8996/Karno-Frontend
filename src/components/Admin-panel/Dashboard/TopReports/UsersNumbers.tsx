"use client";
import { useMemo } from "react";
import UserStore from "@Store/UserStore";
import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import { MiniLoader } from "@app/loadings/loading";
import { UsersTypes } from "@Types/userStore";
import { HiUsers } from "react-icons/hi";


export default function UsersNumber() {
    // Optimize selector to prevent unnecessary re-renders
    const GetAllUsers = UserStore((state) => state?.GetAllUsers);

    const { data: allUsers, isLoading, isError, error } = useAPIQuery<UsersTypes | UsersTypes[] | null>({
        key: ["allUsers"],
        queryFn: GetAllUsers,
    });

    // Memoize calculation to prevent unnecessary recalculations
    const allUsersLength = useMemo(() => {
        if (!allUsers) return 0;
        return Array.isArray(allUsers) ? allUsers.length : 0;
    }, [allUsers]);

    return (
        <div 
            className="group relative w-1/4 h-48 p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden"
            role="region"
        >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                        کاربران
                    </h2>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30">
                        <HiUsers className="w-5 h-5 text-emerald-400" />
                    </div>
                </div>

                {/* Main Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <MiniLoader />
                    </div>
                ) : isError ? (
                    <div className="flex flex-col gap-3 py-4">
                        <div className="flex items-center gap-2 text-red-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium">خطا</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            {error instanceof Error ? error.message : "خطا در دریافت اطلاعات"}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                            <strong 
                                className="text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent"
                                aria-live="polite"
                            >
                                {allUsersLength.toLocaleString("en-US")}
                            </strong>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                            کل کاربران
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    );
}