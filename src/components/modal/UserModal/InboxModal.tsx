import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import { NextAPI } from "@lib/axios";
import { notificationType } from "@Types/NotificationType";
import axios from "axios";
import toast from "react-hot-toast";
import { MiniLoader } from "../../../app/loadings/loading";
import { BaseModal } from "../BaseModal";

interface NotificationsInboxModalProps {
    onClose?: () => void;
}

export default function NotificationsInboxModal({ onClose }: NotificationsInboxModalProps) {
    const GetNotificationsFn = async () => {
        try {
            const NotifResponse = await NextAPI.get("/api/Notifications/getNotifications");
            if (NotifResponse.data && NotifResponse.status === 200) return NotifResponse.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    toast.error("آیدی کاربر الزامیست !");
                } else {
                    toast.error("خطای داخلی سرور !");
                }

            }

            console.log(error);

            throw new Error("Failed to get Notifications !");

        }

    };



    const {

        data: Notifications,

        isLoading,

        isError,

    } = useAPIQuery({

        key: ["Notifications"],

        queryFn: GetNotificationsFn,

    });



    const notificationsList = (Notifications?.data as notificationType[] | undefined) ?? [];



    const formatDate = (date: Date | string) => {

        const d = new Date(date);

        return d.toLocaleDateString("fa-IR", {

            year: "numeric",

            month: "short",

            day: "2-digit",

        });

    };

    const formatTime = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };



    const getTypeLabel = (type: notificationType["type"]) => {

        switch (type) {

            case "VERIFY_ACCOUNT":

                return "احراز هویت";

            case "WARNING":

                return "هشدار";

            case "SYSTEM":

                return "سیستمی";

            default:

                return "اعلان";

        }

    };



    const getTypeColor = (type: notificationType["type"]) => {

        switch (type) {

            case "VERIFY_ACCOUNT":

                return "bg-blue-500/20 text-blue-200 border-blue-400/40";

            case "WARNING":

                return "bg-red-500/20 text-red-200 border-red-400/40";

            case "SYSTEM":

                return "bg-yellow-500/20 text-yellow-100 border-yellow-400/40";

            default:

                return "bg-white/10 text-white border-white/20";

        }

    };



    const hasNotifications = notificationsList.length > 0;



    return (

        <BaseModal onClose={onClose} scrollable className="max-h-[80vh]">

            <BaseModal.Header

                title="صندوق اعلان‌ها"

                subtitle="آخرین اعلان‌های مربوط به حساب کاربری شما"

                badge={

                    hasNotifications ? (

                        <div className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80 border border-white/20 mt-4">

                            {notificationsList.length} اعلان

                        </div>

                    ) : undefined

                }

            />



            <BaseModal.Body>

                {isLoading ? (

                    <div className="flex items-center justify-center py-10">

                        <MiniLoader />

                    </div>

                ) : isError ? (

                    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">

                        <p className="text-sm md:text-base text-red-200">

                            مشکلی در دریافت اعلان‌ها پیش آمد.

                        </p>

                        <p className="text-xs text-white/50">

                            لطفاً چند لحظه دیگر دوباره تلاش کنید.

                        </p>

                    </div>

                ) : !hasNotifications ? (

                    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">

                        <div className="w-14 h-14 rounded-2xl border border-dashed border-white/20 flex items-center justify-center text-white/40 bg-white/5">

                            ✨

                        </div>

                        <p className="text-sm md:text-base text-white/80">

                            هنوز اعلانی برای شما ثبت نشده است.

                        </p>

                        <p className="text-xs text-white/50">

                            وقتی اعلان جدیدی داشته باشید، اینجا نمایش داده می‌شود.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1 custom-scrollbar">

                        {notificationsList.map((item) => (

                            <div

                                key={`${item.userId}-${item.createdAt}`}

                                className="relative flex flex-col gap-2 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent px-4 py-3 text-right text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"

                            >

                                <div className="flex items-center justify-between gap-3">

                                    <h3 className="text-sm md:text-base font-semibold line-clamp-1">

                                        {item.title}

                                    </h3>

                                    <span

                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] md:text-xs font-medium border shrink-0 ${getTypeColor(
                                            item.type
                                        )}`}

                                    >

                                        {getTypeLabel(item.type)}

                                    </span>

                                </div>



                                <p className="text-xs md:text-sm text-white/75 leading-relaxed line-clamp-3">

                                    {item.message}

                                </p>



                                <div className="mt-1 flex items-center justify-between text-[10px] md:text-xs text-white/50">

                                    <span>

                                        {formatDate(item.createdAt)} -{" "}

                                        {formatTime(item.createdAt)}

                                    </span>

                                    {item.isRead ? (

                                        <span className="text-emerald-300/80">

                                            خوانده شده

                                        </span>

                                    ) : (

                                        <span className="text-sky-300/80">

                                            جدید

                                        </span>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </BaseModal.Body>

        </BaseModal>

    );

}

