import { useApiMutation } from "@hooks/useAPIMutation";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

interface DeleteUsersModalProps {
    onClose?: () => void;
    username: string;
    id: string
}

export default function DeleteUser({ onClose, username, id }: DeleteUsersModalProps) {
    const [currentUsername, setCurrentUsername] = useState("");
    const queryClient = useQueryClient();

    const FinalDelete = useApiMutation({
        method: "delete",
        url: "/api/user/deleteUser",
        useNextAPI: true,
        onSuccessCallback: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
            toast.success(`کاربر ${username} با موفقیت حذف شد`, { style: { color: "#fff" } })
            onClose?.();
        },
        onErrorCallback: (error) => {
            if (error.response?.status === 401) {
                toast.error("اطلاعات کامل نیست", { style: { color: "#fff" } })
            } else if (error.response?.status === 404) {
                toast.error("خطا در حذف کاربر , دوباره امتحان کنید", { style: { color: "#fff" } })
            } else {
                toast.error("خطای داخلی سرور", { style: { color: "#fff" } })
            }
        }
    });

    const handleDeleteUser = async () => {
        const trimmedUsername = currentUsername.trim();

        // Validate input is not empty
        if (!trimmedUsername) {
            toast.error("لطفاً نام کاربری را وارد کنید", { style: { color: "#fff" } });
            return;
        }

        // Validate username matches exactly
        if (trimmedUsername !== username) {
            toast.error("نام کاربری وارد شده با نام کاربری انتخاب شده مطابقت ندارد", { style: { color: "#fff" } });
            return;
        }

        // Prevent double submission
        if (FinalDelete.isPending) {
            return;
        }

        try {
            await FinalDelete.mutateAsync({ id, username });
        } catch (error) {
            // Error handling is already done in onErrorCallback
            console.error("Failed to delete user:", error);
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-2xl h-auto overflow-y-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
                >
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="absolute left-4 top-2 cursor-pointer top-1 z-10 p-2 rounded-full hover:bg-gray-600/40 transition-all duration-200 text-gray-600 hover:text-gray-900 active:scale-95"
                        >
                            <IoClose className="w-5 h-5 text-white/40" />
                        </button>
                    )}

                    <h2 className="text-xl font-semibold py-4 text-red-400 text-center">
                        حذف کاربر
                    </h2>

                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <p className="text-sm text-gray-400">
                            جهت حذف <span className="text-white">{username}</span> ابتدا نام کاربری وی را وارد نمایید
                        </p>
                        <span className="text-gray-400">آیدی کاربر : <i className="text-gray-300/80">{id}</i></span>
                        <input
                            type="text"
                            value={currentUsername ?? ""}
                            onChange={(e) => setCurrentUsername(e.target.value)}
                            placeholder="نام کاربر"
                            className="bg-white/7 text-white border w-1/2 border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 p-5">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition-all active:scale-95"
                        >
                            لغو
                        </button>

                        <button
                            type="submit"
                            onClick={handleDeleteUser}
                            disabled={FinalDelete.isPending}
                            className={`px-5 py-2 rounded-xl transition-all text-white/80 active:scale-95 ${
                                FinalDelete.isPending
                                    ? "bg-red-500/20 cursor-not-allowed opacity-50"
                                    : "bg-red-500/40 hover:bg-red-500/60 cursor-pointer"
                            }`}
                        >
                            {FinalDelete.isPending ? "در حال حذف..." : "حذف کاربر"}
                        </button>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}