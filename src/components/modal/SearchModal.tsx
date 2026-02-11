"use client"

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { templatesData } from "../../data/TemplatesData";
import Link from "next/link";

interface SearchModalProps {
    onClose?: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSearch = () => {
        if (searchQuery.trim()) {
            // Add search logic here
            alert(searchQuery);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

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
                    className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
                >
                    {/* Search Container */}
                    <div className="p-6 md:p-10 w-full ">
                        {/* Search Input */}
                        <div className="w-full flex flex-col justify-center items-center gap-9">
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="absolute left-4 top-2 cursor-pointer top-1 z-10 p-2 rounded-full hover:bg-red-600/20 transition-all duration-200 text-gray-600 hover:text-gray-900 active:scale-95"
                                    aria-label="بستن"
                                >
                                    <IoClose className="w-5 h-5 text-white/40" />
                                </button>
                            )}
                            <div className="relative flex felx-row items-center gap-3 w-full">
                                <div className="absolute right-4 top-9 text-gray-400 pointer-events-none">
                                    <CiSearch className="w-7 h-7" />
                                </div>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="جستجو کنید..."
                                    className="w-full pr-12 pl-4 py-4 text-lg bg-gray-50/20 border-none rounded-xl outline-none transition-all duration-200 focus:bg-white/30   text-gray-900 placeholder:text-gray-400 mt-5"
                                    dir="rtl"
                                />
                            </div>
                        </div>

                        {/* Search Suggestions / Results Placeholder */}
                        {searchQuery && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-gray-200/60"
                            >
                                <p className="text-sm text-gray-100 text-center">
                                    نتایج جستجو برای: <span className="font-semibold text-blue-200">{searchQuery}</span>
                                </p>
                            </motion.div>
                        )}

                        {/* Helper Text */}
                        {!searchQuery && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 text-sm text-gray-200 text-center"
                            >
                                برای جستجو، متن خود را وارد کنید و Enter را فشار دهید
                            </motion.p>
                        )}
                    </div>
                    <div className="w-full h-auto flex flex-col justify- items-center gap-5 mb-5">
                        <h5 className="text-sm text-gray-200 text-center">پیشنهادات مناسب برای شما : </h5>
                        <div className="w-full h-auto flex flex-row justify-center items-center gap-3">
                            {templatesData.map((tpl, idx) => (
                            <Link href={`/CV?tpl=${tpl.id}`} key={tpl.id || idx} className="w-1/6">
                                <button
                                    type="button"
                                    className="w-full h-auto p-2 rounded-full bg-green-500/30 text-white/80
                                     text-sm transition-all hover:bg-green-500/20 cursor-pointer active:scale-95"
                                     onClick={onClose}
                                >
                                    {tpl?.name}
                                </button>
                            </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}