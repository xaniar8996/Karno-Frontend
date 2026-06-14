"use client"
import { useEffect, useState } from "react";
import { useAtom } from "jotai"
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Sidebar, { page } from "./Sidebar/sidebar";
import Dashboard from "./Dashboard/Dashboard";
import CVs from "./CVManagement/CVs";
import Users from "./UserManagement/users";
import Analytics from "./AnalyticsManagement/analytics";

export default function MixedPages() {
    const [isOpen, setIsOpen] = useState(true);
    const [currentPage] = useAtom(page)

    // خواندن مقدار ذخیره شده
    useEffect(() => {
        const savedIsOpen = localStorage.getItem("isOpen");
        if (savedIsOpen !== null) {
            setIsOpen(savedIsOpen === "true");
        }
    }, []);

    // ذخیره مقدار جدید
    useEffect(() => {
        localStorage.setItem("isOpen", isOpen.toString());
    }, [isOpen]);

    return (
        <div className="w-full min-h-screen py-5 flex flex-row justify-start items-start gap-5 bg-slate-900">
            <div className="w-auto">
                {!isOpen && (
                    <MdKeyboardArrowLeft
                        onClick={() => setIsOpen(true)}
                        className="text-3xl text-white absolute top-82 right-1 bg-white/20 rounded-full cursor-pointer hover:bg-white/40 transition-all"
                    />
                )}
                {/* menu */}
                <AnimatePresence >
                    {isOpen && (
                        <motion.div
                            key="sidebar"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative w-full"
                        >
                            <Sidebar />

                            <MdKeyboardArrowRight
                                onClick={() => setIsOpen(false)}
                                className="text-3xl text-white absolute top-84 right-[280px] bg-white/20 rounded-full cursor-pointer hover:bg-white/40 transition"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* sections ... */}

            {currentPage === "dashboard" ? (
                <Dashboard />
            ) : currentPage === "users" ? (
                <Users />
            ) : currentPage === "CVs" ? (
                <CVs />
            ) : currentPage === "analytics" ? (
                <Analytics />
            ) :
                (
                    <div className="text-white px-10">
                        <h1>Page "{currentPage}" is coming soon</h1>
                    </div>
                )}

        </div>
    )
}