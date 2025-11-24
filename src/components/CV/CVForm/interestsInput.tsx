"use client";

import { useResumeStore } from "@Store/resumeStore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";

export default function InterestsInput() {
    const { interests, addinterests, removeInterests } = useResumeStore();
    const [description, setDescription] = useState("");

    const inputClass =
        "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300 focus:border-black focus:bg-white transition-all outline-none";

    const handleAddFavourite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim()) return;

        if (interests.length >= 1) {
            toast.error("فقط یک توضیح مجاز است");
            return;
        } else {
            addinterests({
                Description: description.trim(),
            });
        }

        setDescription("");
    };

    return (
        <div className="w-full h-full overflow-y-auto px-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">علاقه‌مندی‌ها</h2>

            <form onSubmit={handleAddFavourite} className="space-y-3">
                <div className="space-y-1">
                    <label className="text-sm text-gray-700">توضیحات</label>
                    <textarea
                        rows={4}
                        className={inputClass}
                        placeholder="مثال: خواندن کتاب، ورزش، موسیقی، سفر..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-3 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
                >
                    افزودن علاقه‌مندی
                </button>
            </form>

            {interests.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">
                        علاقه‌مندی‌های اضافه شده:
                    </h3>
                    <div className="space-y-2">
                        {interests.map((favourite, index) => (
                            <div
                                key={`favourite-${index}`}
                                className="group px-3 py-2 bg-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors"
                            >
                                <div className="flex flex-col gap-1 flex-1">
                                    <span className="text-sm text-gray-800">
                                        {favourite.Description}
                                    </span>
                                </div>
                                <FaTrashCan
                                    onClick={() => removeInterests(index)}
                                    className="text-sm text-red-400 cursor-pointer transition-all hover:text-red-500 active:scale-95 opacity-0 group-hover:opacity-100 flex-shrink-0 ml-2"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

