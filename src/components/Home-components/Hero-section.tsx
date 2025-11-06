"use client"
import React from 'react'
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <div
            className='h-[32rem] w-full flex flex-row justify-around items-center mb-60 relative'
        >
            <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    repeatType: "reverse",
                }}
                className='w-full h-full rounded-4xl shadow-xl shadow-gray-400 flex flex-row justify-around items-center'
                style={{
                    backgroundImage: "url(/Images/windows-11-blue-stock-official-3840x2160-5656.jpg)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}
            >
                <div className='w-auto flex flex-col justify-center items-center gap-7'>
                    <h1 className='w-auto text-6xl text-white text-shadow-lg'>به کارنو خوش اومدی</h1>
                    <p className='w-auto text-3xl text-white text-shadow-lg'>اینجا میتونی رزومه رویاییت بسازی</p>
                    <motion.div
                        whileTap={{
                            scale: 0.97
                        }}
                        className='w-full'
                    >
                        <button type='button' className='w-full bg-black cursor-pointer text-white p-4 text-lg rounded-xl'>اولین رزومه ات رو بساز</button>
                    </motion.div>
                </div>
            </motion.div>
            <div className="w-1/2 h-36 flex flex-row justify-around items-center bg-gray-300/70 backdrop-blur-2xl border border-white/30 absolute -bottom-16 rounded-3xl shadow-lg shadow-gray-600/25">
                <h1 className='text-3xl font-semibold'>" فرصت‌ها منتظر نمی‌مانند ، خودت آن‌ها را بساز "</h1>
            </div>
        </div>
    )
}

