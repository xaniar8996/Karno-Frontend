"use client";

import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import { NotificationType } from "@Types/notificationType";
import { UsersTypes } from "@Types/userStore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import { BaseModal } from "../BaseModal";

interface SendNotificationModalProps {
    onClose?: () => void;
    selectedUser: Partial<UsersTypes> | null;
}

export default function SendNotificationModal({ onClose, selectedUser }: SendNotificationModalProps) {

    const { register, handleSubmit } = useForm<NotificationType>({
        defaultValues: {
            type: "system"
        }
    });

    const SendNotification = useApiMutation({
        url: "/api/Notifications/sendNotification",
        method: "post",
        useNextAPI: true,
        onSuccessCallback: () => {
            toast.success("اعلان با موفقیت ارسال شد", { style: { color: "#fff" } });
            onClose?.();
        },
        onErrorCallback: () => {
            toast.error("خطایی رخ داده , دوباره امتحان کن" , { style: { color: "#fff" } });
        }
    });

    const HandleSendNotification = (data: NotificationType) => {
        if (!data || !selectedUser?._id) {
            toast.error("اطلاعات کامل نیست", { style: { color: "#fff" } });
            return;
        }
        SendNotification.mutate({
            userId: selectedUser?._id,
            title: data.title,
            message: data.message,
            type: data.type,
        });
    }

    const displayName = selectedUser?.Fullname ?? selectedUser?.email ?? "";

    return (
        <BaseModal onClose={onClose} zIndex={110} scrollable>
            <BaseModal.Header
                title={
                    <>
                        ارسال اعلان به{" "}
                        <span className="text-blue-300">{displayName}</span>
                    </>
                }
            />

            <form onSubmit={handleSubmit(HandleSendNotification)}>
                <BaseModal.Body className="text-white">
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm text-white/60">عنوان اعلان</label>
                            <input
                                {...register("title", { required: "عنوان اعلان الزامی است" })}
                                type="text"
                                placeholder="مثلاً: احراز هویت ناقص"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/60 transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm text-white/60">پیام اعلان</label>
                            <textarea
                                {...register("message", { required: "پیام اعلان الزامی است" })}
                                placeholder="..."
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/60 transition-all max-h-60 min-h-[100px]"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm text-white/60">نوع اعلان</label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    {...register("type", { required: true })}
                                    type="radio"
                                    value="auth"
                                    className="accent-red-500"
                                />
                                <span className="text-white">احراز هویت</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    {...register("type", { required: true })}
                                    type="radio"
                                    value="warning"
                                    className="accent-yellow-500"
                                />
                                <span className="text-white">هشدار</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    {...register("type", { required: true })}
                                    type="radio"
                                    value="system"
                                    className="accent-blue-500"
                                />
                                <span className="text-white">سیستمی</span>
                            </label>
                        </div>
                    </div>
                </BaseModal.Body>

                <BaseModal.Footer>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition-all active:scale-95 text-white/90"
                    >
                        لغو
                    </button>

                    <button
                        type="submit"
                        disabled={SendNotification.isPending}
                        className={`px-5 py-2 rounded-xl transition-all text-white active:scale-95 ${
                            SendNotification.isPending
                                ? "bg-blue-500/20 cursor-not-allowed opacity-50"
                                : "bg-blue-500/50 hover:bg-blue-500/65 cursor-pointer flex flex-row-reverse justify-center items-center gap-2"
                        }`}
                    >
                        {SendNotification.isPending ? "در حال ارسال ..." : "ارسال"}
                        {!SendNotification.isPending && <IoSend className="w-4 h-4" />}
                    </button>
                </BaseModal.Footer>
            </form>
        </BaseModal>
    );
}
