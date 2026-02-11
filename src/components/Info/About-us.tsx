"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const About_us = () => {
  return (
    <section className="mb-32 mt-16 flex items-center justify-center px-6 font-[Vazirmatn]">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-block px-4 py-1 rounded-full text-sm bg-black/5 text-gray-600">
            درباره ما
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            رزومه‌ای که
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {" "}شخصیت تو{" "}
            </span>
            رو نشون میده
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            ما اینجا هستیم تا ساخت رزومه رو از یک کار خسته‌کننده،
            به یک تجربه‌ی سریع، حرفه‌ای و لذت‌بخش تبدیل کنیم.
            بدون قالب‌های تکراری، بدون دردسر.
          </p>

          <p className="text-gray-500 text-sm leading-relaxed">
            هدف ما اینه که هر فرد بتونه با چند کلیک، رزومه‌ای بسازه
            که دقیقاً نمایانگر مهارت‌ها، مسیر شغلی و شخصیتش باشه.
          </p>

          <div className="flex gap-4 pt-4">
            <Link href="/CV/CVSlider">
              <button className="px-6 py-3 cursor-pointer rounded-xl bg-black text-white hover:scale-105 transition active:scale-95 transition-all duration-200">
                شروع ساخت رزومه
              </button>
            </Link>
            <button className="px-6 py-3 rounded-xl border border-black/20 text-gray-700 hover:bg-black/5 transition">
              قالب‌ها
            </button>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 blur-2xl opacity-30 absolute"></div>
          <div className="relative w-80 h-80 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-2xl flex flex-col justify-center items-center gap-4 text-center p-8">
            <img src="/logo/logo.png" alt="logo" className="w-auto h-20" />
            <p className="text-gray-600 text-sm leading-relaxed">
              طراحی‌شده برای برنامه‌نویس‌ها، طراح‌ها،
              فریلنسرها و حرفه‌ای‌ها
            </p>

            <div className="mt-6 flex gap-3">
              <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                مدرن
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                مینیمال
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-black/10 text-gray-800">
                حرفه ای
              </span>
            </div>
          </div>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-gray-600"
        >
          ساخته شده با ❤️ توسط {""}
          <Link href="https://github.com/xaniar8996" target="_blank" className="text-blue-500 hover:text-blue-600">
            xanitech
          </Link>
        </motion.span>
      </div>
    </section>
  );
};

export default About_us;
