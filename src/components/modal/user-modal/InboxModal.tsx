"use client";

import { useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import { NextAPI } from "@lib/axios";
import { NotificationType } from "@Types/notificationType";

import { MiniLoader } from "../../../app/loadings/loading";
import { BaseModal } from "../BaseModal";

interface NotificationsInboxModalProps {
    onClose?: () => void;
}

const TYPE_LABELS = {
    auth: "احراز هویت",
    warning: "هشدار",
    system: "سیستمی",
} as const;

const Type_Colors = {
    auth: "bg-red-500/20 text-red-200 border-red-400/40",
    warning: "bg-yellow-500/20 text-yellow-200 border-yellow-400/40",
    system: "bg-blue-500/20 text-blue-100 border-blue-400/40",
} as const;

export default function NotificationsInboxModal({ onClose }: NotificationsInboxModalProps) {

    const getNotifications = async () => {
        try {
            const response = await NextAPI.get("/api/Notifications/getNotifications");
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.status === 400 ? "آیدی کاربر الزامیست !" : "خطای داخلی سرور !");
            }
            throw new Error("Failed to fetch notifications");
        }
    };

    const { data, isLoading, isError } = useAPIQuery({
        key: ["Notifications"],
        queryFn: getNotifications,
    });

    const notifications = useMemo(
        () => (data?.data as NotificationType[]) ?? [],
        [data]
    );

    const formatDate = (date: string | Date) =>
        new Date(date).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });

    const formatTime = (date: string | Date) =>
        new Date(date).toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const hasNotifications = notifications.length > 0;

    return (
        <BaseModal onClose={onClose} scrollable className="max-h-[80vh]">

            <BaseModal.Header
                title="صندوق اعلان‌ها"
                subtitle="آخرین اعلان‌های حساب شما"
                badge={
                    hasNotifications &&
                    <div className="mt-4 px-3 py-1 rounded-full bg-white/10 text-xs text-white/80 border border-white/20">
                        {notifications.length} اعلان
                    </div>
                }
            />
            <BaseModal.Body>
                {isLoading &&
                    <div className="flex justify-center py-10">
                        <MiniLoader />
                    </div>
                }
                {isError &&
                    <div className="flex flex-col items-center gap-2 py-10 text-center">
                        <p className="text-red-300">دریافت اعلان‌ها ناموفق بود</p>
                        <span className="text-xs text-white/50">دوباره تلاش کنید</span>
                    </div>
                }
                {!isLoading && !isError && !hasNotifications &&
                    <div className="flex flex-col items-center gap-3 py-12">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center">
                            ✨
                        </div>
                        <p className="text-white/80">هنوز اعلانی ندارید</p>
                    </div>
                }
                {hasNotifications &&
                    <div className="space-y-3 max-h-[55vh] overflow-y-auto">

                        {notifications.map((item) => (
                            <div
                                key={`${item.userId}-${item.createdAt}`}
                                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-xl"
                            >
                                <div className="flex justify-between items-center gap-3">
                                    <h3 className="font-semibold text-white">
                                        {item.title}
                                    </h3>
                                    <span className={`rounded-full px-2 py-1 text-[10px] border ${Type_Colors[item.type as keyof typeof Type_Colors] ?? "bg-white/10 text-white"}`}>
                                        {TYPE_LABELS[item.type as keyof typeof TYPE_LABELS] ?? "اعلان"}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-white/70">
                                    {item.message}
                                </p>
                                <div className="mt-3 flex justify-between text-xs text-white/40">
                                    <span>
                                        {formatDate(item.createdAt)} - {formatTime(item.createdAt)}
                                    </span>
                                    <span className={item.isRead ? "text-emerald-300" : "text-sky-300"}>
                                        {item.isRead ? "خوانده شده" : "جدید"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </BaseModal.Body>
        </BaseModal>
    );
}