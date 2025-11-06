"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { BaseAPI } from "@lib/axios";
import { getAccessToken } from "@lib/auth";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const accessToken = getAccessToken();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const { data, isLoading } = useQuery<{ Fullname?: string } | null>({
    queryKey: ["User"],
    queryFn: async () => {
      try{
        const response = await BaseAPI.get("/users/single-user",);
        return response?.data?.data ?? null;
      }catch (error) {
        console.log(error);
        return null;
      }      
    }
  });

  // don't show header in login or register
  if(pathname === "/Auth/login" || pathname === "/Auth/register" ){
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
      <Image
        width={150}
        height={150}
        src="/logo/logo.png"
        alt="logo"
        className="transition-all duration-300"
      />
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
          <motion.div whileTap={{ scale: 0.95 }} className="cursor-pointer">
          {/* <GoPerson className="text-black text-2xl" /> */}
          {data?.Fullname ?? 'حساب کاربری'}
        </motion.div>
        )}
        <motion.div whileTap={{ scale: 0.95 }} className="cursor-pointer">
          <CiSearch className="text-black text-2xl" />
        </motion.div>
      </div>
    </motion.header>
  );
}
