"use client";
import { motion } from "framer-motion";
import { UsersTypes } from "@Types/userStore";
import { IoSend } from "react-icons/io5";
import SendNotificationModal from "./user-modal/SendNotificationModal";
import { useModal } from "@hooks/ui/useModal";
import { useState } from "react";
import { BaseModal } from "./BaseModal";

interface SearchModalProps {
    onClose?: () => void;
    unAuthorizedUsersList: UsersTypes[];
}

export default function UnAuthorizedUsersModal({
    onClose,
    unAuthorizedUsersList,
}: SearchModalProps) {
    const [selectedUser, setSelectedUser] = useState<UsersTypes | null>(null);
    const sendNotificationModal = useModal();

    const HandleSelectUser = (user: UsersTypes) => {
        setSelectedUser(user);
        sendNotificationModal.open();
    }

    return (
        <>
            <BaseModal onClose={onClose} scrollable>
                <BaseModal.Header
                    title="کاربران احراز هویت نشده"
                    className="[&_h2]:text-red-300/90"
                />

                <BaseModal.Body className="pt-2">
                    <ul className="space-y-3">
                        {unAuthorizedUsersList.map((user) => (
                            <motion.li
                                key={user.id || user._id}
                                whileHover={{ scale: 1.01 }}
                                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400/80 to-red-600 flex items-center justify-center font-semibold text-white shadow-lg shadow-red-900/30">
                                        {user.Fullname?.charAt(0) ||
                                            user.email?.charAt(0) ||
                                            "U"}
                                    </div>

                                    <div>
                                        <p className="text-white font-medium">
                                            {user.Fullname || "Unknown User"}
                                        </p>
                                        <p className="text-white/55 text-sm">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => HandleSelectUser(user ?? {})}
                                    className="text-sm flex flex-row-reverse justify-center items-center gap-2 cursor-pointer active:scale-95 transition-all duration-200 bg-blue-500/20 text-blue-200 border border-blue-400/30 rounded-lg px-3 py-2 hover:bg-blue-500/35"
                                >
                                    <span className="text-xs font-medium">ارسال اعلان</span>
                                    <IoSend className="w-4 h-4" />
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                </BaseModal.Body>
            </BaseModal>

            {sendNotificationModal.isOpen && (
                <SendNotificationModal
                    onClose={sendNotificationModal.close}
                    selectedUser={selectedUser ?? null}
                />
            )}
        </>
    );
}
