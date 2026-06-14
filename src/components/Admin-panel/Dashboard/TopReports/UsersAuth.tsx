"use client";
import { useCallback, useMemo, useState } from "react";
import UserStore from "@Store/UserStore";
import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import { MiniLoader } from "@app/loadings/loading";
import { UsersTypes } from "@Types/UserStore";
import UnAuthorizedUsersModal from "@components/modal/unAuthorizedUsers";
import { HiShieldExclamation } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useModal } from "@hooks/ui/useModal";

export default function UsersAuth() {
    const [isOpen, setIsOpen] = useState(false);
    // Optimize selector - Zustand automatically memoizes selectors
    const GetAllUsers = UserStore((state) => state?.GetAllUsers);
    const unAuthorizedUsersModal = useModal();

    // Share the same query key with UsersNumbers component for cache efficiency
    const { data: allUsers, isLoading, isError, error } = useAPIQuery<UsersTypes | UsersTypes[] | null>({
        key: ["allUsers"],
        queryFn: GetAllUsers,
    });

    // Memoize calculation - optimized filter with early return
    const unAuthorizedUsersCount = useMemo(() => {
        if (!allUsers || !Array.isArray(allUsers)) return 0;

        // Use reduce for better performance on large arrays
        return allUsers.reduce((count, user) => {
            return user.isAccountVerified === false ? count + 1 : count;
        }, 0);
    }, [allUsers]);

    const unAuthorizedUsersList = useMemo<UsersTypes[]>(() => {
        if (!allUsers || !Array.isArray(allUsers)) return [];
        return allUsers.filter((user) => user.isAccountVerified === false);
    }, [allUsers])


    return (
        <div className="w-1/4">
            <div
                className="group relative w-full h-48 p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 overflow-hidden"
                role="region"
                aria-label="کاربران تایید نشده"
            >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                            احراز هویت نشده
                        </h2>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                            <HiShieldExclamation className="w-5 h-5 text-amber-400" />
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
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">خطا</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                {error instanceof Error
                                    ? error.message
                                    : typeof error === "string"
                                        ? error
                                        : "خطا در دریافت اطلاعات"}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-baseline gap-2">
                                <strong
                                    className="text-6xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
                                    aria-live="polite"
                                >
                                    {unAuthorizedUsersCount.toLocaleString("en-US")}
                                </strong>
                            </div>
                            <div className="w-full h-auto flex flex-row justify-between items-center">
                                <p className="text-xs text-gray-500 font-medium">
                                    کاربران احراز هویت نشده
                                </p>
                                <button
                                    onClick={() => unAuthorizedUsersModal.open()}
                                    className="text-xs text-gray-400/50 font-medium bg-gray-800 py-1 px-2 rounded-sm cursor-pointer hover:bg-gray-700 hover:text-gray-400 transition-all flex flex-row justify-between items-center gap-1 active:scale-95">
                                    <span>اسامی</span>
                                    <IoIosArrowRoundBack className="text-lg" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* modal */}
            </div>
            {unAuthorizedUsersModal.isOpen &&
                <UnAuthorizedUsersModal unAuthorizedUsersList={unAuthorizedUsersList} onClose={() => unAuthorizedUsersModal.close()} />}

        </div>
    );
}