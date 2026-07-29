"use client";
import React, { useState } from "react";
import { Button } from "@components/base/button";
import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import { useResumeStore } from "@Store/resumeStore";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";


export default function InterestsInput() {
    const { interests, addinterests, removeInterests } = useResumeStore();
    const [description, setDescription] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const inputClass =
        "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300 focus:border-black focus:bg-white transition-all outline-none resize-none";

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

    const handleSummariesText = useApiMutation({
        key: "textSummary",
        url: "/api/AI/textSummary",
        method: "post",
        useNextAPI: true,
        onSuccessCallback: () => {
            toast.success("متن بهبود یافت");
        },
        onErrorCallback: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    toast.error("محدودیت استفاده از هوش مصنوعی");
                    setError("استفاده از هوش مصنوعی محدودیت روزانه داره , فردا دوباره میتونی استفاده کنی");
                } else if (error.response?.status === 404) {
                    toast.error("اطلاعات شخصی الزامی است !");
                } else {
                    toast.error("خطای داخلی سرور");
                }
            }
        }
    });

    const summariesText = async () => {
        if (description.trim() === "" || description.length === 0) {
            toast.error("ابتدا متن خود را بنویسید");
            return
        }

        try {
            const responsedText = await handleSummariesText.mutateAsync({ description });
            if (responsedText.data && responsedText.status === 200) {
                setDescription(responsedText.data.improvedText);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="w-full h-full overflow-y-auto px-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">علاقه‌مندی‌ها</h2>

            <form onSubmit={handleAddFavourite} className="space-y-3">
                <div className="space-y-1">
                    <label className="text-sm text-gray-700">توضیحات</label>
                    <textarea
                        rows={6}
                        className={inputClass}
                        placeholder="مثال: خواندن کتاب، ورزش، موسیقی، سفر..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    {error && (
                        <span className="text-xs text-red-600">
                            {error}
                        </span>
                    )}
                </div>

                <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 mb-5">
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="md"
                        fullWidth
                        className='cursor-pointer hover:bg-blue-500 transition-all'>
                        افزودن علاقه‌مندی
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        size="md"
                        onClick={summariesText}
                        icon={<FaWandMagicSparkles className="text-lg" />}
                        className="
                        w-full
                        sm:w-1/2
                        cursor-pointer
                        text-white
                        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                        
                        transition-all duration-300
                        shadow-xl shadow-purple-500/30
                        hover:shadow-gray-800/20
                        hover:scale-[1.02]
                        active:scale-95
                        rounded-xl 
                        "
                    > 
                        {handleSummariesText.isPending ? "در حال پردازش" : " بهبود متن با AI"}   
                    </Button>
                </div>
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
