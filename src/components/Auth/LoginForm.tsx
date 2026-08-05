"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";
import { useForm } from "react-hook-form"
import { FiEyeOff } from "react-icons/fi";
import { PiSignInFill } from "react-icons/pi";
import { setAccessToken } from "@lib/auth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";

interface LoginData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [showPass, setShowPass] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

    const loginMutation = useApiMutation({
      method:"post",
        url: "/api/Auth/account/Login",
        successMessage: "ورود با موفقیت انجام شد",
        useNextAPI:true,
        onSuccessCallback: (res: any) => {
            const token = res?.data?.accessToken;
            if (token) {
                setAccessToken(token);
            }
            router.replace("/Home");
            queryClient.invalidateQueries({ queryKey: ["User"] })
        },
        onErrorCallback: (error) => {
            if (error?.response?.status === 404) {
                toast.error("کاربر وجود ندارد !" , { style: { color: '#fff' } });
            } else if (error?.response?.status === 400) {
                toast.error("اطلاعات کامل نیست" , { style: { color: '#fff' } });
            } else if (error?.response?.status === 401) {
                toast.error("اطلاعات نادرست است !" , { style: { color: '#fff' } });
            } else if (error?.response?.status === 500) {
                toast.error("خطای داخلی سرور" , { style: { color: '#fff' } });
            } else {
                toast.error("خطای ناشناخته" , { style: { color: '#fff' } });
            }
        }
    });

    const handleLogin = (data: LoginData) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="w-full h-dvh flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-2 sm:p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-[380px] bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              ورود به <span className="text-green-400">کارنو</span>
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              خوش اومدی، ادامه بده 👋
            </p>
          </div>
  
          {/* Form */}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-4"
          >
            <input
              {...register("email", { required: "ایمیل الزامی است", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "ایمیل نامعتبر است" } })}
              placeholder="ایمیل"
              className="w-full rounded-xl bg-white/10 border border-white/10 p-3 text-sm text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
  
            <div className="relative">
              <input
                {...register("password", { required: "رمز عبور اجباری است", minLength: { value: 8, message: "رمز عبور باید حداقل 8 کاراکتر باشد" } })}
                type={showPass ? "text" : "password"}
                placeholder="رمز عبور"
                className="w-full rounded-xl bg-white/10 border border-white/10 p-3 text-sm text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
  
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={loginMutation.isPending}
              type="submit"
              className={`mt-4 w-full rounded-xl cursor-pointer text-black font-semibold py-3 ${loginMutation.isPending ? "hover:bg-none" : "hover:bg-green-500"} transition-all ${loginMutation.isPending ? "bg-gray-400" : "bg-green-400"}`}
            >
              {loginMutation.isPending ? "در حال ورود..." : "ورود"}
            </motion.button>
          </form>
  
          {/* Footer */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/Auth/register")}
              className="text-sm text-gray-400 cursor-pointer hover:text-white transition inline-flex items-center gap-1"
            >
              ثبت‌نام
              <PiSignInFill />
            </button>
          </div>
        </motion.div>
      </div>
    )
}