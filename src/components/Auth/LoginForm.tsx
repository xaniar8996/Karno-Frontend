"use client"
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";
import { useForm } from "react-hook-form"
import { FiEyeOff } from "react-icons/fi";
import { PiSignInFill } from "react-icons/pi";
import { BaseAPI } from "@lib/axios";
import { setAccessToken } from "@lib/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function LoginForm() {
    const [showPass, setShowPass] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const handleLogin = async (data: any) => {
        try {

            const HandleAddUser = await BaseAPI.post("/Login", data);
            if (HandleAddUser.data) {
                const token = HandleAddUser.data.accessToken;
                if (token) {
                    setAccessToken(token);
                }
                toast.success("ورود با موفقیت انجام شد");
            }
        } catch (error) {
            console.log("خطا در ورود , لطفا دوباره امتحان کنید");
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    toast.error("کاربر وجود ندارد !");
                } else if (error.response?.status === 400) {
                    toast.error("اطلاعات کامل نیست");
                } else if (error.response?.status === 401) {
                    toast.error("رمز عبور نادرست است !");
                }
                else if (error.response?.status === 500) {
                    toast.error("خطای داخلی سرور");
                }
            }
        }
    }

    return (
        <div className="w-full h-dvh flex justify-between items-center bg-[url(/Images/pple-carplay-ios-26-4000x2182-23298.jpg)] bg-cover bg-no-repeat px-10 ">
            <motion.div
                initial={{
                    x: 20,
                    opacity: 0
                }}
                animate={{
                    x: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 0.5,
                    repeatType: "reverse"
                }}
                className="w-1/2 h-11/12 bg-white/40 backdrop-blur-3xl rounded-3xl flex flex-col justify-center items-center gap-10 px-20"
            >
                <div className="w-auto h-auto flex flex-col justify-center items-start gap-5">
                    <h1 className="text-6xl font-bold">با <b className="text-green-400">کارنو</b></h1>
                    <h2 className="text-2xl">رزومه رویاییت رو بساز</h2>
                    <p className="text-lg text-gray-800">
                        هر رزومه‌ای فقط یک برگه نیست… دروازه‌ای به آینده‌ی شغلی توست.
                        اینجا جاییه که حرفه‌ای دیده می‌شی.
                        رزومه بساز، فرصت‌ها رو شکار کن
                    </p>
                </div>
                <form onSubmit={handleSubmit(handleLogin)} className="w-full flex flex-col justify-center items-start gap-5">
                    <h6 className="text-lg">ایمیل</h6>
                    <input {...register("email")} type="text" placeholder="email" className="w-full h-auto rounded-full p-4 bg-none border border-gray-800 outline-none text-black focus:-translate-y-2 focus:shadow-lg focus:shadow-gray-600 transition-all" />
                    <h6>رمز عبور</h6>
                    <div className="w-full flex flex-row justify-center items-center gap-3">
                        <input {...register("password")} type={showPass ? "text" : "password"} className="w-full h-auto rounded-full p-4 bg-none border border-gray-800 outline-none text-black focus:-translate-y-2 focus:shadow-lg focus:shadow-gray-600 transition-all" />
                        {!showPass ? (
                            <FiEye className="text-2xl cursor-pointer transition-all" onClick={() => setShowPass(true)} />

                        ) : (
                            <FiEyeOff className="text-2xl cursor-pointer transition-all" onClick={() => setShowPass(false)} />

                        )}
                    </div>

                    <motion.div
                        whileTap={{
                            scale: 0.95
                        }}
                        className="w-full"
                    >
                        <button type="submit" className="w-full bg-black rounded-full text-white p-4 cursor-pointer transition-all hover:bg-gray-900">
                            {isSubmitting ? "در حال ورود ..." : "ورود"}
                        </button>
                    </motion.div>
                </form>
            </motion.div>
            <motion.div
                initial={{
                    y: -20,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 0.5,
                    repeatType: "reverse"
                }}
                className="w-auto h-full"
            >
                <button onClick={() => router.push("/Auth/register")} className="text-white bg-black p-3 px-8 cursor-pointer rounded-full flex flex-row justify-center items-center gap-2 mt-10 hover:bg-gray-900 transition-all">
                    <span>ثبت نام</span>
                    <PiSignInFill className="text-2xl" />
                </button>
            </motion.div>
        </div>
    )
}