"use client"
import { useState } from "react";
import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteModal } from "@context/DeleteModalContext";
import { BaseModal } from "../BaseModal";

export default function DeleteUser() {
    const { isOpen, data, closeModal } = useDeleteModal();
    const [currentUsername, setCurrentUsername] = useState("");
    const queryClient = useQueryClient();

    const deleteConfig = data?.type === "user"
        ? {
            url: "/api/user/deleteUser",
            queryKeys: [["allUsers"], ["UserCV"]],
            successMessage: `کاربر ${data?.name || ""} با موفقیت حذف شد`,
            requiresUsername: true,
        }
        : {
            url: "/api/CV/delete",
            queryKeys: [["allCVs"], ["UserCV"]],
            successMessage: `رزومه ${data?.name || ""} با موفقیت حذف شد`,
            requiresUsername: false,
        };

    const FinalDelete = useApiMutation({
        method: "delete",
        url: deleteConfig.url,
        useNextAPI: true,
        onSuccessCallback: () => {
            if (!data) return;

            deleteConfig.queryKeys.forEach(key => {
                queryClient.invalidateQueries({ queryKey: key });
            });
            toast.success(deleteConfig.successMessage, { style: { color: "#fff" } });
            closeModal();
            setCurrentUsername("");
        },
        onErrorCallback: (error) => {
            if (error.response?.status === 401) {
                toast.error("اطلاعات کامل نیست", { style: { color: "#fff" } });
            } else if (error.response?.status === 404) {
                toast.error(`خطا در حذف ${data?.type === "user" ? "کاربر" : "رزومه"}، دوباره امتحان کنید`, { style: { color: "#fff" } });
            } else {
                toast.error("خطای داخلی سرور", { style: { color: "#fff" } });
            }
        }
    });

    if (!data) return null;

    const handleDelete = async () => {
        if (!data) return;

        if (deleteConfig.requiresUsername) {
            const trimmedUsername = currentUsername.trim();

            if (!trimmedUsername) {
                toast.error("لطفاً نام کاربری را وارد کنید", { style: { color: "#fff" } });
                return;
            }

            if (trimmedUsername !== data.name) {
                toast.error("نام کاربری وارد شده با نام کاربری انتخاب شده مطابقت ندارد", { style: { color: "#fff" } });
                return;
            }
        }

        if (FinalDelete.isPending) {
            return;
        }

        try {
            if (data.type === "user") {
                await FinalDelete.mutateAsync({ id: data.id, username: data.name });
            } else {
                await FinalDelete.mutateAsync({ id: data.id });
            }
        } catch (error) {
            console.error(`Failed to delete ${data.type}:`, error);
        }
    }

    return (
        <BaseModal open={isOpen} onClose={closeModal}>
            <BaseModal.Header
                title={data.type === "user" ? "حذف کاربر" : "حذف رزومه"}
                className="[&_h2]:text-red-300"
                withCloseOffset
            />

            <BaseModal.Body>
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <p className="text-sm text-white/60 text-center">
                        جهت حذف <span className="text-white font-medium">{data.name}</span>{" "}
                        {deleteConfig.requiresUsername && "ابتدا نام کاربری وی را وارد نمایید"}
                    </p>
                    <span className="text-white/50 text-sm">
                        آیدی {data.type === "user" ? "کاربر" : "رزومه"}:
                        <i className="text-white/70"> {data.id}</i>
                    </span>

                    {deleteConfig.requiresUsername && (
                        <input
                            type="text"
                            value={currentUsername}
                            onChange={(e) => setCurrentUsername(e.target.value)}
                            placeholder="نام کاربری"
                            className="bg-white/5 text-white border w-full max-w-xs border-white/15 rounded-xl px-4 py-2.5 outline-none focus:border-red-400/50 transition-all"
                            onKeyDown={(e) => e.key === "Enter" && handleDelete()}
                        />
                    )}
                </div>
            </BaseModal.Body>

            <BaseModal.Footer>
                <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition-all active:scale-95 text-white/90"
                >
                    لغو
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={FinalDelete.isPending}
                    className={`px-5 py-2 rounded-xl transition-all text-white active:scale-95 ${
                        FinalDelete.isPending
                            ? "bg-red-500/20 cursor-not-allowed opacity-50"
                            : "bg-red-500/50 hover:bg-red-500/65 cursor-pointer"
                    }`}
                >
                    {FinalDelete.isPending
                        ? "در حال حذف..."
                        : `حذف ${data.type === "user" ? "کاربر" : "رزومه"}`
                    }
                </button>
            </BaseModal.Footer>
        </BaseModal>
    );
}
