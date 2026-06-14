"use client";
import { useMemo } from "react";
import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import { MiniLoader } from "@app/loadings/loading";
import { NextAPI } from "@lib/axios";
import { AiOutlineFileText } from "react-icons/ai";

export default function CVNumbers() {

    const getAllCVs = async () => {
        try {
            const response = await NextAPI.get("/api/CV/allCvs");
            return response?.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const { data: allCVs, isLoading, isError, error } = useAPIQuery({
        key: ["allCVs"],
        queryFn: getAllCVs,
    });

    const allCVsLength = useMemo(() => {
        if (!allCVs) return 0;
        
        // Handle both array and object with data property
        if (Array.isArray(allCVs)) {
            return allCVs.length;
        }
        
        // If it's an object with data property (backward compatibility)
        if (allCVs && typeof allCVs === 'object' && 'data' in allCVs && Array.isArray(allCVs.data)) {
            return allCVs.data.length;
        }
        
        return 0;
    }, [allCVs]);
    

    return (
        <div 
            className="group relative w-1/4 h-48 p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-blue-500/10 backdrop-blur-sm border border-blue-500/20 hover:border-blue-300/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
            role="region"
        >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                        رزومه های ساخته شده
                    </h2>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-blue-500/30">
                        <AiOutlineFileText className="w-5 h-5 text-blue-400" />
                    </div>
                </div>

                {/* Main Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-5">
                        <MiniLoader />
                    </div>
                ) : isError ? (
                    <div className="flex flex-col gap-3 py-4">
                        <div className="flex items-center gap-2 text-red-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium">خطا</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            {error instanceof Error ? error.message : "خطا در دریافت اطلاعات"}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                            <strong 
                                className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-400 to-teal-400 bg-clip-text text-transparent"
                                aria-live="polite"
                            >
                                {allCVsLength.toLocaleString("en-US")}
                            </strong>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                            کل رزومه ها
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    );
}