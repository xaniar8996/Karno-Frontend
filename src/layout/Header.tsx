// header
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { MdMarkEmailRead } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import UserStore from "@Store/UserStore";
import { clearAllTokens } from "@lib/auth";
import { useApiMutation } from "@hooks/useAPIMutation";


export default function Header() {
  const GetUser = UserStore((state) => state?.GetUser);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["User"],
    queryFn: GetUser,
  });

  const [scrolled, setScrolled] = useState(false);
  const [hideTab, setHideTab] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // send OTP ...

  const sendOTPMutation = useApiMutation({
    url: "/api/Auth/otp/sendOtp",
    successMessage: "کد تایید به ایمیل شما ارسال شد",
  });

  // logout ...

  const Logout = useApiMutation({
    url: "/api/Auth/account/Logout",
    successMessage: "خروج از اکانت موفقیت آمیز بود",
    useNextAPI: true,
    onSuccessCallback() {
      router.replace("/Auth/login");
      clearAllTokens();
    },
  })

  const HandleSendOTP = () => {
    sendOTPMutation.mutate({});
  };

  const HandleLogout = () => {
    Logout.mutate({});
  };

  // hidden routes
  const hiddenRoutes = [
    "/Auth/login",
    "/Auth/register",
    "/Auth/VerifyEmail",
    "/Auth/error/UnverifiedEmail"
  ]

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.35)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0,0,0,0.1)"
          : "0 0 0 rgba(0,0,0,0)",
        padding: "1rem ",
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="sticky top-0 left-0 w-full h-auto z-50 flex flex-row justify-around items-center gap-20 transition-[padding,backdrop-filter,background-color,box-shadow] duration-500"
    >
      <Link
        href="/"
      >
        <Image
          width={150}
          height={150}
          src="/logo/logo.png"
          alt="logo"
          className="transition-all duration-300"
        />
      </Link>
      <div className="flex flex-row justify-center items-center gap-10 text-black">
        <h6 className="hover:scale-110 transition-all cursor-pointer active:scale-105">
          ساخت رزومه
        </h6>
      <Link href="/Info/Aboutus">
      <h6 className="hover:scale-110 transition-all cursor-pointer active:scale-105">
          درباره ما
        </h6>
      </Link>
        <h6 className="hover:scale-110 transition-all cursor-pointer active:scale-105">
          نمونه رزومه
        </h6>
      </div>
      <div className="flex flex-row justify-center items-center gap-8">
        {isLoading ? (
          <span>در حال بارگذاری ...</span>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <Link href="/profile">
              <motion.div
                onMouseEnter={() => setHideTab(true)}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-blue-200/20 p-2 rounded-xl flex flex-row justify-center items-center gap-2"
              >
                <span className={`h-1 w-1 rounded-full ${!data?.isAccountVerified ? "bg-red-400" : "bg-emerald-400"}`} />
                <RxPerson className="text-black text-lg" />
                {data?.Fullname ?? 'حساب کاربری'}
              </motion.div>
            </Link>
            {/* Tab */}
            <AnimatePresence>
              {hideTab && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}

                  transition={{
                    duration: 3000,
                    repeatType: "reverse",
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  onMouseLeave={() => setHideTab(false)}
                  className="w-auto h-auto text-sm p-1 flex flex-col justify-center items-center gap-1 backdrop-blur-xl border bg-white/40 border-white/60 shadow-gray-600/25 rounded-xl absolute top-20">
                  {!data?.isAccountVerified && (
                    <Link
                      href="/Auth/VerifyEmail"
                      className="w-full"
                    >
                      <h3
                        className="w-full flex flex-row-reverse justify-center items-center gap-2 p-2 rounded-lg cursor-pointer transition-all hover:bg-gray-300/30 active:scale-95"
                        onClick={() => HandleSendOTP()}
                      >
                        <span>تایید ایمیل</span>
                        <MdMarkEmailRead className="text-md font-semibold" />
                      </h3>
                    </Link>
                  )}
                  <button
                    onClick={() => HandleLogout()}
                    className="w-full flex flex-row-reverse justify-center items-center gap-2 p-2 rounded-lg cursor-pointer transition-all hover:bg-red-400/30 active:scale-95"
                  >
                    <span>خروج</span>
                    <CiLogout className="text-md font-semibold" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        <motion.div whileTap={{ scale: 0.95 }} className="cursor-pointer">
          <CiSearch className="text-black text-2xl" />
        </motion.div>
      </div>
    </motion.header>
  );
}
