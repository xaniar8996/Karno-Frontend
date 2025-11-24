"use client"
import { useState } from "react";
import MainForm from "@components/CV/MainForm";
import ResumeTemplate from "@components/CV/Template";
import { FaEye, FaEyeSlash, FaFile } from "react-icons/fa6";

export default function page(){
    const [viewMode, setViewMode] = useState<"both" | "form" | "resume">("both");
    
    return(
        <div className="w-full min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto mb-6 flex justify-center gap-3">
                <button
                    onClick={() => setViewMode("both")}
                    className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition-all flex items-center gap-2 ${
                        viewMode === "both"
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
                    <FaEye />
                    نمایش هر دو
                </button>
                <button
                    onClick={() => setViewMode("form")}
                    className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition-all flex items-center gap-2 ${
                        viewMode === "form"
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
                    <FaFile />
                    فقط فرم
                </button>
                <button
                    onClick={() => setViewMode("resume")}
                    className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition-all flex items-center gap-2 ${
                        viewMode === "resume"
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
                    <FaEyeSlash />
                    فقط رزومه
                </button>
            </div>

            {/* Content */}
            <div className={`w-full flex flex-row-reverse justify-center items-start gap-10 transition-all ${
                viewMode === "both" ? "flex-row-reverse" : viewMode === "form" ? "justify-center" : "justify-center"
            }`}>
                {(viewMode === "both" || viewMode === "resume") && (
                    <div className={`${viewMode === "resume" ? "w-full max-w-4xl" : "w-1/2"} transition-all`}>
                        <ResumeTemplate/>
                    </div>
                )}
                {(viewMode === "both" || viewMode === "form") && (
                    <div className={`${viewMode === "form" ? "w-full max-w-2xl" : "w-1/2"} transition-all`}>
                        <MainForm/>
                    </div>
                )}
            </div>
        </div>
    )
}
