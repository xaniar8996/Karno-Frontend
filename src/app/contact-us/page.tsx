"use client";
import { Button } from "@components/base/button";
import { BaseAPI, NextAPI } from "@lib/axios";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactUsTypes>();

  const handleContact = async (data: ContactUsTypes) => {
    try {
      const responseContact = await BaseAPI.post("/contact-us", data);
      if (responseContact.data || responseContact.status === 200) {
        toast.success("اطلاعات با موفقیت ارسال شد");
        setTimeout(() => {
          toast.success("گزارش/پیشنهاد شما بررسی خواهد شد");
        }, 4000);
        reset();
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("اطلاعات ناقص است !");
        } else {
          toast.error("خطای داخلی سرور");
        }
      }
    }
  };

  return (
    <section className="mb-32 mt-36 px-6 font-[Vazirmatn]">
      <div className="max-w-6xl mx-auto grid gap-16 lg:grid-cols-2 items-start">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-block px-4 py-1 rounded-full text-sm bg-black/5 text-gray-600">
            تماس با ما
          </span>

          <h1 className="text-4xl md:text-4xl font-extrabold leading-tight text-gray-900">
            پیشنهادی داری یا باگی دیدی؟
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              با گزارش تو، اینجا بهتر می‌شه!
            </span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-600">
            من مشتاقانه منتظر بازخوردت هستم. هر پیشنهادی داری یا ایرادی توی سایت
            دیدی بگو تا با هم برطرفش کنیم.
          </p>

          <div className="w-full">
            <div className="rounded-3xl border border-black/5 bg-white/80 p-6 shadow-sm flex flex-row justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">آدرس ایمیل</p>
                <p className="mt-3 text-lg font-semibold text-gray-900">
                  xanitech.ir@gmail.com
                </p>
              </div>
              <Link href="mailto:xanitech.ir@gmail.com">
                <Button
                  variant="contained"
                  color="default"
                  size="sm"
                  className="hover:bg-black/80 transition-all cursor-pointer"
                >
                  ارسال ایمیل
                </Button>
              </Link>
            </div>
          </div>

          <Link href="/">
            <Button
              variant="contained"
              color="default"
              size="md"
              className="hover:bg-black/80 transition-all cursor-pointer"
            >
              برگشت به خانه
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-[2rem] bg-slate-950/95 p-8 text-white shadow-2xl ring-1 ring-white/10"
        >
          <div className="absolute inset-x-8 top-0 h-32 rounded-[1.75rem] bg-gradient-to-r from-yellow-400 to-orange-500 opacity-15 blur-3xl" />
          <div className="relative space-y-6">
            <div className="space-y-2">
              <p className="text-sm uppercase text-yellow-300">
                گزارش یا پیشنهاد
              </p>
              <h2 className="text-3xl font-semibold text-white">
                با من در تماس باش
              </h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(handleContact)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-gray-300">
                    نام و نام خانوادگی
                  </span>
                  <input
                    type="text"
                    {...register("Fullname")}
                    placeholder="مثال: علی احمدی"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/20"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-300">ایمیل</span>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="example@karno.com"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/20"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm text-gray-300">موضوع</span>
                <input
                  type="text"
                  {...register("subject")}
                  placeholder="موضوع پیام"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/20"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-300">پیام شما</span>
                <textarea
                  rows={6}
                  {...register("message")}
                  placeholder="اینجا بنویسید..."
                  className="mt-2 w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/20"
                />
              </label>

              <div className="w-full flex items-center justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="default"
                  size="md"
                  className={`${isSubmitting ? "w-1/2" : "w-full"} bg-white/20 hover:bg-white/10 transition-all cursor-pointer`}
                >
                  {isSubmitting ? "درحال ارسال ..." : "ارسال پیام"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
