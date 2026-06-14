"use client"

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { templatesData } from "../../data/TemplatesData";
import Link from "next/link";
import { BaseModal } from "./BaseModal";

interface SearchModalProps {
    onClose?: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            alert(searchQuery);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <BaseModal onClose={onClose}>
            <div className="p-6 md:p-10 w-full">
                <div className="w-full flex flex-col justify-center items-center gap-9">
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
                            className="w-full pr-12 pl-4 py-4 text-lg bg-white/10 border border-white/10 rounded-xl outline-none transition-all duration-200 focus:border-white/25 focus:bg-white/15 text-white placeholder:text-white/40 mt-5"
                            dir="rtl"
                        />
                    </div>
                </div>

                {searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/10"
                    >
                        <p className="text-sm text-white/70 text-center">
                            نتایج جستجو برای:{" "}
                            <span className="font-semibold text-blue-200">{searchQuery}</span>
                        </p>
                    </motion.div>
                )}

                {!searchQuery && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-sm text-white/50 text-center"
                    >
                        برای جستجو، متن خود را وارد کنید و Enter را فشار دهید
                    </motion.p>
                )}
            </div>
            <div className="w-full h-auto flex flex-col justify- items-center gap-5 mb-6 px-6">
                <h5 className="text-sm text-white/60 text-center">
                    پیشنهادات مناسب برای شما:
                </h5>
                <div className="w-full h-auto flex flex-row flex-wrap justify-center items-center gap-3">
                    {templatesData.map((tpl, idx) => (
                        <Link href={`/CV?tpl=${tpl.id}`} key={tpl.id || idx} className="min-w-[5rem] flex-1">
                            <button
                                type="button"
                                className="w-full h-auto p-2 rounded-full bg-emerald-500/25 text-white/90 text-sm transition-all hover:bg-emerald-500/35 border border-emerald-400/20 cursor-pointer active:scale-95"
                                onClick={onClose}
                            >
                                {tpl?.name}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </BaseModal>
    );
}
