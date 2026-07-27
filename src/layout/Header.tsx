// header
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { CiLogout } from "react-icons/ci";
import { MdMarkEmailRead } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import UserStore from "@Store/UserStore";
import SearchModal from "../components/modal/SearchModal";
import { hiddenRoutes } from "@lib/hiddenRoutes";
import { RiAdminLine } from "react-icons/ri";
import { useSendOTP } from "@hooks/auth/useSendOTP";
import { useLogout } from "@hooks/auth/useLogout";

export default function Header() {
  const isHidden = hiddenRoutes();
  const GetUser = UserStore((state) => state?.GetUser);
  const [isOpen, setIsOpen] = useState(false);
  const Logout = useLogout();

  const { data, isLoading } = useQuery({
    queryKey: ["User"],
    queryFn: GetUser,
  });

  const sendOTPMutation = useSendOTP();

  const [scrolled, setScrolled] = useState(false);
  const [hideTab, setHideTab] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const HandleSendOTP = () => {
    sendOTPMutation.mutate({});
  };

  const HandleLogout = () => {
    Logout.mutate({})
  };

  if (isHidden) return null

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-7xl z-50 px-4">
        <motion.header
          animate={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.18)"
              : "rgba(255,255,255,0.10)",
            backdropFilter: "blur(24px)",
            borderColor: scrolled
              ? "rgba(255,255,255,0.30)"
              : "rgba(255,255,255,0.15)",
            boxShadow: scrolled
              ? "0 10px 40px rgba(0,0,0,0.12)"
              : "0 5px 25px rgba(0,0,0,0.08)",
            y: scrolled ? 0 : 5,
            scale: scrolled ? 0.99 : 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="
            relative
            overflow-visible
            rounded-[24px]
            border
            border-white/20
            bg-white/10
            backdrop-blur-3xl
            shadow-2xl
            px-5
            py-2
          "
        >
          {/* Glass Glow */}


          <div className="relative z-10 flex flex-row justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <Image
                width={130}
                height={130}
                src="/logo/logo.png"
                alt="logo"
                className="transition-all duration-300 hover:scale-105"
              />
            </Link>

            {/* Menu */}
            <div className="flex flex-row justify-center items-center gap-10 text-black font-medium">
              <Link href="/CV/CVSlider">
                <div className="group cursor-pointer transition-all hover:bg-gray-200/20 p-2 rounded-xl active:scale-95">
                  <span className="transition-all duration-300">
                    ساخت رزومه
                  </span>
                </div>
              </Link>

              <Link href="/about-us">
                <div className="group relative cursor-pointer transition-all hover:bg-gray-200/20 p-2 rounded-xl active:scale-95">
                  <h6 className="transition-all duration-300">
                    درباره ما
                  </h6>
                </div>
              </Link>

              <div className="group relative cursor-pointer transition-all hover:bg-gray-200/20 p-2 rounded-xl active:scale-95">
                <h6 className="transition-all duration-300">
                  نمونه رزومه
                </h6>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-row justify-center items-center gap-5">
              {isLoading ? (
                <span>در حال بارگذاری ...</span>
              ) : (
                <div className="relative">
                  <Link href="/profile">
                    <motion.div
                      onMouseEnter={() => setHideTab(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="
                        cursor-pointer
                        flex
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-white/20
                        bg-white/20
                        backdrop-blur-xl
                        px-4
                        py-2
                        shadow-lg
                        transition-all
                        duration-300
                        hover:bg-white/30"
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${!data?.isAccountVerified
                          ? "bg-red-400"
                          : "bg-emerald-400"
                          }`}
                      />
                      <RxPerson className="text-black text-lg" />
                      <span className="font-medium text-black">
                        {data?.Fullname ?? "حساب کاربری"}
                      </span>
                    </motion.div>
                  </Link>

                  <AnimatePresence>
                    {hideTab && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{
                          duration: 0.25,
                        }}
                        onMouseLeave={() => setHideTab(false)}
                        className="
                          absolute
                          top-16
                          left-1/2
                          -translate-x-1/2
                          min-w-[190px]
                          rounded-2xl
                          border
                          border-white/20
                          bg-white/90
                          backdrop-blur-3xl
                          shadow-2xl
                          p-2
                          overflow-hidden"
                      >
                        {!data?.isAccountVerified && (
                          <Link
                            href="/Auth/VerifyEmail"
                            className="w-full block"
                          >
                            <h3
                              onClick={() => HandleSendOTP()}
                              className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                p-3
                                transition-all
                                hover:bg-blue-500/20
                                cursor-pointer active:scale-95"
                            >
                              <span>تایید ایمیل</span>
                              <MdMarkEmailRead />
                            </h3>
                          </Link>
                        )}

                        {data?.roles.Admin && (
                          <Link
                            href="/Admin/Dashboard"
                            className="w-full block"
                          >
                            <h3
                              className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                p-3
                                transition-all
                                hover:bg-green-500/20
                                cursor-pointer active:scale-95
                              "
                            >
                              <span>پنل ادمین</span>
                              <RiAdminLine />
                            </h3>
                          </Link>
                        )}

                        <button
                          onClick={() => HandleLogout()}
                          className="
                            w-full
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            p-3
                            transition-all
                            hover:bg-red-500/20
                            cursor-pointer active:scale-95
                          "
                        >
                          <span>خروج</span>
                          <CiLogout />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Search Button */}
              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="
                  h-11
                  w-11
                  flex
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/20
                  backdrop-blur-xl
                  shadow-lg
                  hover:bg-white/30 cursor-pointer
                  transition-all
                "
              >
                <CiSearch className="text-black text-2xl" />
              </motion.button>
            </div>
          </div>
        </motion.header>
      </div>

      {isOpen && <SearchModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
