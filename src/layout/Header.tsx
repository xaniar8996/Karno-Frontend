"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { MdMarkEmailRead } from "react-icons/md";
import Link from "next/link";
import { BaseAPI } from "@lib/axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import UserStore from "@Store/UserStore";


export default function Header() {
  const GetUser = UserStore((state) => state?.GetUser);
  
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

  const HandleSendOTP = async () => {
    try {
      const OTPResponse = await BaseAPI.post("/api/Auth/otp/sendOtp");
      if (OTPResponse.data && OTPResponse.status === 200) {
        toast.success("کد تایید به ایمیل شما ارسال شد");
        console.log(OTPResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }


  if (pathname === "/Auth/login" || pathname === "/Auth/register" || pathname === "/Auth/VerifyEmail") {
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
        padding: "1.2rem 0",
      }}
      transition={{ duration: 0.4 }}
      className={`${scrolled ? "fixed" : "relative"} top-0 left-0 w-full h-auto z-50 flex flex-row justify-around items-center gap-20 transition-all ${scrolled ? "rounded-xl border-white/20" : ""
        }`}
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
        <h6 className="hover:scale-110 transition-all cursor-pointer active:scale-105">
          راهنما
        </h6>
        <h6 className="hover:scale-110 transition-all cursor-pointer active:scale-105">
          درباره ما
        </h6>
        <h6 className="hover:scale-110 transition-all cursor-pointer active:scale-105">
          نمونه رزومه
        </h6>
      </div>
      <div className="flex flex-row justify-center items-center gap-8">
        {isLoading ? (
          <span>در حال بارگذاری ...</span>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <motion.div
              onMouseEnter={() => setHideTab(true)}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer bg-blue-600/20 p-2 rounded-xl"
            >
              {data?.Fullname ?? 'حساب کاربری'}
            </motion.div>
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
                  <h3
                    className="w-full flex flex-row-reverse justify-center items-center gap-2 p-2 rounded-lg cursor-pointer transition-all hover:bg-red-400/30 active:scale-95"
                  >
                    <span>خروج </span>
                    <CiLogout className="text-md font-semibold" />
                  </h3>
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
