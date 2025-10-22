"use client"
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { PiSignInFill } from "react-icons/pi";

interface SwitchSideProps {
    setSwitchSide: Dispatch<SetStateAction<boolean>>
}

export default function LoginForm({ setSwitchSide }: SwitchSideProps) {
    const [showPass, setShowPass] = useState(false);

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
                <div className="w-auto h-auto flex flex-col justify-center items-start gap-8">
                    <h1 className="text-7xl font-bold">با <b className="text-green-400">کارنو</b></h1>
                    <h2 className="text-3xl">رزومه رویاییت رو بساز</h2>
                    <p className="text-xl text-gray-800">
                        هر رزومه‌ای فقط یک برگه نیست… دروازه‌ای به آینده‌ی شغلی توست.
                        اینجا جاییه که حرفه‌ای دیده می‌شی.
                        رزومه بساز، فرصت‌ها رو شکار کن
                    </p>
                </div>
                <div className="w-full flex flex-col justify-center items-start gap-5">
                    <h6 className="text-lg">ایمیل</h6>
                    <input type="text" placeholder="email" className="w-full h-auto rounded-full p-4 bg-none border border-gray-800 outline-none text-black focus:-translate-y-2 focus:shadow-lg focus:shadow-gray-600 transition-all" />
                    <h6>رمز عبور</h6>
                    <div className="w-full flex flex-row justify-center items-center gap-3">
                        <input type={showPass ? "text" : "password"} className="w-full h-auto rounded-full p-4 bg-none border border-gray-800 outline-none text-black focus:-translate-y-2 focus:shadow-lg focus:shadow-gray-600 transition-all" />
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
                        <button type="button" className="w-full bg-black rounded-full text-white p-4 cursor-pointer transition-all hover:bg-gray-900">
                            ورود
                        </button>
                    </motion.div>
                </div>
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
                <button onClick={() => setSwitchSide(false)} className="text-white bg-black p-3 px-8 cursor-pointer rounded-full flex flex-row justify-center items-center gap-2 mt-10 hover:bg-gray-900 transition-all">
                    <span>ثبت نام</span>
                    <PiSignInFill className="text-2xl" />
                </button>
            </motion.div>
        </div>
    )
}