"use client"
import {  NextAPI } from "@lib/axios";
import UserStore from "@Store/UserStore";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RiMailSendFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyEmail() {
    const User = UserStore((state) => state?.Users);
    const [OTP, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOtp = [...OTP];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 6) {
            inputRefs.current[index + 1]?.focus();
        } else {
            inputRefs.current[index - 1]?.focus();
        }
    };


    const handleVerifyAccount = async () => {
        const isComplete = OTP.every((digit) => digit.trim().length === 1);
        if (!isComplete) {
            toast.error("کد کامل را وارد نمایید")
            return;
        }

        try {
            const response = await NextAPI.post("/api/Auth/otp/verifyEmail", { OTP: OTP.join("") });
            if (response.data && response.status === 200) {
                toast.success("اکانت با موفقیت تایید شد");
                console.log(response.data);
                router.replace("/")
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                if(error.response?.status === 400){
                    toast.error("اطلاعات کامل نیست")
                }else if(error.response?.status === 404){
                    toast.error("کاربر پیدا نشد")
                }else if(error.response?.status === 410){
                    toast.error("کد منقضی شده ")
                }else if(error.response?.status === 401){
                    toast.error("کد نادرست است ")
                }else{
                    toast.error("خطای داخلی سرور ")
                }
            }
        }
    }

    return (
        <div className="w-full h-dvh flex justify-center items-center bg-[url(/Images/macos-tahoe-26-6016x6016-22673.jpg)] bg-cover bg-no-repeat relative">
            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 3000,
                    repeatType: "reverse",
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                }}
                className="w-1/4 h-auto p-5 bg-white rounded-3xl flex flex-col justify-center items-center gap-5"
            >
                <RiMailSendFill className="text-7xl" />
                <span className="text-xs text-gray-700">کد تایید به ایمیل {User?.email} فرستاده شد</span>
                <div className="w-1/4 h-1/2 bg-white rounded-3xl flex flex-row-reverse justify-center items-center gap-2 ">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            dir="ltr"
                            type="text"
                            ref={(el) => { inputRefs.current[index] = el; }}
                            inputMode="numeric"
                            maxLength={1}
                            key={index}
                            value={OTP[index]}
                            className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none bg-gray-100 focus:border-blue-500 focus:scale-110 transition-all"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleChange(index, e.target.value)
                            }
                        />
                    ))}
                </div>
                <span className="text-sm">کد دریافت نکردی ؟ <b className="text-blue-400 cursor-pointer hover:text-blue-600 transition-all">ارسال دوباره</b></span>
                <div className="w-full h-auto p-5">
                    <button type="button" onClick={() => handleVerifyAccount()} className="w-full h-auto bg-black rounded-xl p-3 text-white cursor-pointer hover:bg-gray-800 transition-all active:scale-95">
                        ارسال کد
                    </button>
                </div>
            </motion.div>
        </div>
    )
}