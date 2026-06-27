"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@components/base/button";

export default function AboutUs() {
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center gap-20 mb-10 px-20">
      <motion.h1
        className="relative text-4xl text-center z-10 after:content-[''] after:block after:w-1/2 after:h-[4px] after:bg-gradient-to-r after:from-black after:to-green-600 after:mx-auto after:mt-3 after:rounded-md"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        ساخت رزومه، ساده‌تر از همیشه
      </motion.h1>

      <motion.div
        className="w-full h-auto flex flex-row-reverse justify-center items-center gap-20"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            width={800}
            height={800}
            alt="resume"
            src="/images/undraw_resume-folder_hf4p (1).svg"
          />
        </motion.div>

        <motion.div
          className="w-full h-auto flex flex-col justify-center items-start gap-3"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl">چرا استفاده از کارنو کارت رو راحت‌تر میکنه؟</h3>

          <div className="w-full h-auto flex flex-col justify-center items-start gap-10">
            <p className="text-md leading-7 text-gray-700">
              در دنیایی که فرصت‌ها با سرعت نور از کنارمان عبور می‌کنند، داشتن یک رزومه حرفه‌ای یعنی داشتن برگ برنده‌ای برای ورود به دنیای کار و موفقیت.
              <b className="text-green-600"> کارنو </b> با هدف ساده‌سازی مسیر ساخت رزومه طراحی شده تا هر فرد — از دانشجو گرفته تا مدیر ارشد — بتواند در کمترین زمان، بهترین نسخه از خود را به نمایش بگذارد.
              <br /><br />
              با <b className="text-green-600 text-2xl">کارنو</b>، تنها چند کلیک با یک رزومه‌ی جذاب، منظم و کاملاً حرفه‌ای فاصله داری.
              قالب‌های متنوع، قابلیت شخصی‌سازی بالا، و طراحی هوشمند رابط کاربری باعث می‌شود تجربه‌ی ساخت رزومه برایت مثل یک کار خلاقانه و لذت‌بخش باشد.
              <br /><br />
              ما باور داریم رزومه فقط یک برگه نیست، بلکه داستان حرفه‌ای زندگی توست.
              به همین دلیل، کارنو به‌گونه‌ای ساخته شده تا بتوانی چندین رزومه برای موقعیت‌های مختلف بسازی و مدیریت کنی، اطلاعاتت را همیشه به‌روز نگه داری و در هر زمان و مکان خروجی رزومه‌ات را به اشتراک بگذاری.
              <br /><br />
              با <b className="text-green-600 text-2xl">کارنو</b>، از رقبا جلوتر باش.
              ساده، سریع و حرفه‌ای — چون آینده‌ی شغلی‌ات ارزشش را دارد.
            </p>

            <Link href="/CV/CVSlider" className="w-full">
                <Button
                variant="contained"
                color="default"
                size="md"
                className="w-1/2 cursor-pointer active:scale-95 transition-all"
                >
                  رزومه‌ات رو بساز
                </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
