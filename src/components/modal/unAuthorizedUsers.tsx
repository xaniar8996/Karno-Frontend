"use client"
import { motion, AnimatePresence } from "framer-motion";
import { UsersTypes } from "@Types/UserStore";
import { IoClose } from "react-icons/io5";

interface SearchModalProps {
    onClose?: () => void;
    unAuthorizedUsersList: UsersTypes[]
}

export default function UnAuthorizedUsersModal({ onClose, unAuthorizedUsersList }: SearchModalProps) {

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
                    className="relative w-full max-w-2xl h-40 overflow-y-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
                >
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="absolute left-4 top-2 cursor-pointer top-1 z-10 p-2 rounded-full hover:bg-gray-600/40 transition-all duration-200 text-gray-600 hover:text-gray-900 active:scale-95"
                            aria-label="بستن"
                        >
                            <IoClose className="w-5 h-5 text-white/40" />
                        </button>
                    )}
                    <ul className="p-4 flex flex-col justify-center items-center gap-5">
                        {unAuthorizedUsersList.map((user) => (
                            <li key={user.id || user._id}>{user.Fullname || user.email || 'Unknown User'}</li>
                        ))}
                    </ul>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}