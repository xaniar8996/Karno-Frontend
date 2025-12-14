"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { NextAPI } from "@lib/axios";

export default function UnverifiedAccount() {

  const HandleSendOTP = async () => {
    try {
      const response = await NextAPI.post("/api/Auth/otp/sendOtp");
      if (response.data && response.data.success) {
        toast.success("کد تایید به ایمیل شما ارسال شد");
      }
    } catch (error) {
      console.log(error);
      toast.error("ارسال کد ناموفق بود");
    }
  }

  return (
    <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Glows */}
      <motion.div
        initial="initial"
        animate="animate"
        className="pointer-events-none absolute -left-28 top-[-9rem] h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
      />
      <motion.div
        initial="initial"
        animate="animate"
        className="pointer-events-none absolute bottom-[-7rem] right-[-5rem] h-80 w-80 rounded-full bg-rose-500/25 blur-3xl"
      />

      {/* Glass error card */}
      <motion.div
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-md px-6"
      >
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_90px_rgba(15,23,42,0.9)]">
          {/* Top stripe */}
          <motion.div
            className="relative h-2 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="px-6 pb-6 pt-7">
            {/* Warning icon */}
            <motion.div
              className="mb-4 flex items-center justify-center"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/80 to-rose-500/80 text-white shadow-[0_12px_40px_rgba(248,113,113,0.7)]">
                <span className="text-2xl font-bold">!</span>
                <span className="pointer-events-none absolute inset-0 rounded-2xl border border-white/30/40" />
              </div>
            </motion.div>

            <div className="text-center">
              <h1 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                اکانت شما تایید نشده است
              </h1>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-200/90">
                برای دسترسی به رزومه‌ها و تمام امکانات کارنو، ابتدا باید ایمیل
                خود را تایید کنید.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 text-sm">
              <Link href="/">
                <button className="w-full cursor-pointer rounded-2xl bg-white/10 px-4 py-2.5 text-xs font-medium text-slate-100 backdrop-blur transition hover:bg-white/20">
                  بازگشت به صفحه اصلی
                </button>
              </Link>
              <Link href="/Auth/VerifyEmail">
                <button
                  onClick={() => HandleSendOTP()}
                  className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_14px_40px_rgba(248,113,113,0.7)] transition hover:brightness-110 active:scale-95">
                  تایید ایمیل
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


