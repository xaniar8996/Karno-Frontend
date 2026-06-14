"use client"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthValidation, AuthValidationType } from "@Types/AuthSchema";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import "@assets/style/input.css";

interface RegisterData {
  Fullname: string,
  email: string;
  password: string;
  confirmPassword: string
}

export default function RegisterForm() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<AuthValidationType>({
    resolver: zodResolver(AuthValidation)
  });

  const RegisterMutation = useApiMutation({
    method:"post",
    url: "/api/Auth/account/Register",
    successMessage: "ثبت نام با موفقیت انجام شد",
    useNextAPI: true,
    onSuccessCallback: (res: any) => {
      const token = res?.data?.accessToken;
      if (token) {
        setAccessToken(token);
      }
      router.push("/Auth/Login");
    },
    onErrorCallback: (error) => {
      if (error.status === 409) {
        toast.error("این کاربر قبلا ثبت شده", { style: { color: '#fff' } });
      } else if (error.status === 400) {
        toast.error("اطلاعات کامل نیست", { style: { color: '#fff' } });
      } else {
        toast.error("خطای داخلی سرور", { style: { color: '#fff' } });
      }
    }
  });

  const handleRegister = (data: RegisterData) => {
    const { confirmPassword, ...userdata } = data;

    RegisterMutation.mutate(userdata);
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#020617] p-2 sm:p-0">
      {/* Login Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => router.push("/Auth/login")}
          className="text-sm text-gray-300 cursor-pointer hover:text-white transition"
        >
          ورود
        </button>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-[420px] bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo/logo.png"
            alt="logo"
            width={120}
            height={150}
            className="mb-4"
          />
          <h1 className="text-2xl font-bold text-white">
            ساخت حساب کاربری
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            فقط چند ثانیه تا شروع 🚀
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-4"
        >
          <input
            {...register("Fullname")}
            placeholder="نام و نام خانوادگی"
            className="input"
          />

          <input
            {...register("email")}
            placeholder="ایمیل"
            className="input"
          />

          <div className="relative">
            <input
              {...register("password")}
              type={showPass ? "text" : "password"}
              placeholder="رمز عبور"
              className="input"
              />
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="تکرار رمز عبور"
            className="input"
          />

          <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={RegisterMutation.isPending}
              type="submit"
              className={`mt-4 w-full rounded-xl cursor-pointer text-white font-semibold py-3 ${RegisterMutation.isPending ? "hover:bg-none" : "hover:bg-purple-500"} transition-all ${RegisterMutation.isPending ? "bg-gray-400" : "bg-purple-600"}`}
          >
            {RegisterMutation.isPending ? "در حال ثبت نام..." : "ثبت نام"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
