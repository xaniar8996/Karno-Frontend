"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { templatesData } from "@data/TemplatesData";
import Link from "next/link";

export default function TemplateSlider() {

    return (
        <div className="w-full h-[35rem] flex justify-center items-center">
            <div className="w-full h-auto flex flex-col justify-center items-center gap-16">
                <h1 className="text-3xl">قالبت رو همین الان انتخاب کن</h1>

                <div className="w-full h-auto flex flex-row justify-center items-center gap-6">

                    {templatesData.map((tpl) => (
                        <Link href={`/CV?tpl=${tpl.id}`} key={tpl.id}>
                            <div
                                className="
                            h-64 w-64 rounded-3xl
                            bg-no-repeat bg-cover bg-center
                            flex justify-center items-center 
                            relative overflow-hidden
                            transition-all duration-500
                            hover:scale-105 hover:shadow-2xl
                            backdrop-blur-xl bg-white/10 border
                            border-white/20 cursor-pointer active:scale-95
                            "
                                style={{ backgroundImage: `url(${tpl.image})` }}
                            >
                            <div className="
                            absolute inset-0 bg-gradient-to-t 
                            from-black/60 to-black/20 
                            backdrop-blur-lg opacity-60 
                            hover:opacity-80 transition-all duration-500
                            "></div>

                                <h4 className="relative z-10 text-white text-4xl font-bold drop-shadow-lg">
                                    {tpl.name}
                                </h4>
                            </div>
                        </Link>
                    ))}

                </div>

            </div>
        </div>
    );
}
