"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthValidation, AuthValidationType } from "@Types/AuthSchema";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { BaseAPI } from "@lib/axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@hooks/useAPIMutation";

interface RegisterData {
    Fullname: string,
    email: string;
    password: string;
    confirmPassword: string
}

export default function RegisterForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { register, handleSubmit } = useForm<AuthValidationType>({
        resolver: zodResolver(AuthValidation)
    });

    const RegisterMutation = useApiMutation({
        url: "/api/Auth/account/Register",
        successMessage: "ثبت نام با موفقیت انجام شد",
        useNextAPI: true,
        onSuccessCallback: (res: any) => {
            const token = res?.data?.accessToken;
            if (token) {
                setAccessToken(token);
            }
            router.replace("/Auth/Login");
            queryClient.invalidateQueries({ queryKey: ["User"] })
        },
        onErrorCallback: (error) => {
            console.log("خطا در ورود , لطفا دوباره امتحان کنید");
            if (error.status === 409) {
                toast.error("این کاربر قبلا ثبت شده");
            } else if (error.status === 400) {
                toast.error("اطلاعات کامل نیست");
            } else {
                toast.error("خطای داخلی سرور");
            }
        }
    });

    const handleRegister = (data: RegisterData) => {
        const { confirmPassword, ...userdata } = data;

        RegisterMutation.mutate(userdata);
    };

    return (
        <div className="w-full h-dvh flex justify-center items-center bg-[url(/Images/green-landscape-3840x2160-20840.jpg)] bg-cover bg-no-repeat relative">
            <motion.div
                initial={{
                    y: -20,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.5,
                    repeatType: "reverse",
                }}
                className="absolute top-8 right-8"
            >
                <button
                    onClick={() => router.push("/Auth/login")}
                    className="text-white bg-black p-3 px-8 cursor-pointer rounded-full flex flex-row justify-center items-center gap-2 hover:bg-gray-900 transition-all"
                >
                    <span>ورود</span>
                </button>
            </motion.div>

            {/* فرم اصلی وسط */}
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
                className="w-1/2 h-11/12 bg-white/40 py-20 backdrop-blur-sm rounded-3xl flex flex-col justify-center items-center gap-10 px-20"
            >
                <form onSubmit={handleSubmit(handleRegister)} className="w-full h-full flex flex-col justify-start items-center gap-14">
                    <Image width={100} height={100} src="/logo/logo.png" alt="logo" className="w-1/3 h-auto" />
                    <div className="w-full h-auto grid grid-cols-2 justify-center items-start gap-5">
                        <div className="w-full flex flex-col gap-5">
                            <h6 className="text-lg">نام و نام خانوادگی</h6>
                            <input
                                {...register("Fullname")}
                                type="text"
                                className="w-full rounded-full p-4 border border-gray-800 outline-none text-black focus:-translate-y-2 focus:shadow-lg focus:shadow-gray-600 transition-all"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-5">
                            <h6 className="text-lg">ایمیل</h6>
                            <input
                                {...register("email")}
                                type="text"
                                className="w-full rounded-full p-4 border border-gray-800 outline-none text-black focus:-translate-y-2 focus:shadow-lg focus:shadow-gray-600 transition-all"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-5">
                            <h6 className="text-lg">رمز عبور</h6>
                            <input
                                {...register("password")}
                                type="password"
                                className="w-full rounded-full p-4 border border-gray-800 outline-none text-black focus:-translate-y-2 focus:shadow-lg focus:shadow-gray-600 transition-all"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-5">
                            <h6 className="text-lg">تکرار رمز عبور</h6>
                            <input
                                {...register("confirmPassword")}
                                type="password"
                                className="w-full rounded-full p-4 border border-gray-800 outline-none text-black focus:-translate-y-2 focus:shadow-lg focus:shadow-gray-600 transition-all"
                            />
                        </div>
                    </div>
                    <motion.div whileTap={{ scale: 0.95 }} className="w-full">
                        <button
                            type="submit"
                            className="w-full bg-black rounded-full text-white p-4 cursor-pointer transition-all hover:bg-gray-900"
                        >
                            ثبت نام
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
}
