"use client";

import { useResumeStore } from "@Store/resumeStore";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export default function CertificateInput() {
    const { certificate, addcertificate, removecertificate } = useResumeStore();
    const [courseName, setCourseName] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState("");

    const inputClass =
        "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300 focus:border-black focus:bg-white transition-all outline-none";

    const handleAddCertificate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseName.trim() || !date.trim()) return;

        addcertificate({
            CourseName: courseName.trim(),
            Date: date.trim(),
            Image: image.trim() || undefined,
        });

        setCourseName("");
        setDate("");
        setImage("");
    };

    return (
        <div className="w-full h-full overflow-y-auto px-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">گواهینامه‌ها</h2>

            <form onSubmit={handleAddCertificate} className="space-y-3">
                <div className="space-y-1">
                    <label className="text-sm text-gray-700">نام دوره / گواهینامه</label>
                    <input
                        type="text"
                        className={inputClass}
                        placeholder="مثال: React Advanced, AWS Certified"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col justify-center items-start gap-2 w-full">
                    <label className="text-sm text-gray-700">تاریخ دریافت</label>
                    <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        inputClass={inputClass}
                        placeholder="مثال: 1402/05/15"
                        value={date}
                        onChange={(dateObject) => {
                            if (dateObject) {
                                setDate(dateObject.format());
                            } else {
                                setDate("");
                            }
                        }}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm text-gray-700">تصویر گواهینامه (اختیاری)</label>
                    <input
                        type="text"
                        className={inputClass}
                        placeholder="URL تصویر گواهینامه"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-3 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
                >
                    افزودن گواهینامه
                </button>
            </form>

            {certificate.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">
                        گواهینامه‌های اضافه شده:
                    </h3>
                    <div className="space-y-2">
                        {certificate.map((cert, index) => (
                            <div
                                key={`${cert.CourseName}-${index}`}
                                className="group px-3 py-2 bg-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors"
                            >
                                <div className="flex flex-col gap-1 flex-1">
                                    <span className="font-semibold text-gray-800">
                                        {cert.CourseName}
                                    </span>
                                    <span className="text-xs text-gray-600">{cert.Date}</span>
                                    {cert.Image && (
                                        <a
                                            href={cert.Image}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-600 hover:text-blue-800 truncate"
                                        >
                                            مشاهده تصویر
                                        </a>
                                    )}
                                </div>
                                <FaTrashCan
                                    onClick={() => removecertificate(index)}
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
