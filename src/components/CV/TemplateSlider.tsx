"use client";
import { templatesData } from "@data/TemplatesData";
import Link from "next/link";
import UserStore from "@Store/UserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TemplateSlider() {
    const User = UserStore((state) => state?.Users);
    const router = useRouter();

    useEffect(() => {
        if (User && User.isAccountVerified === false) {
            router.replace("/Auth/error/UnverifiedEmail");
        }
    }, [User]);


    return (
        <div className="relative w-full min-h-[35rem] flex justify-center items-center mt-20 px-6 overflow-hidden">
            {/* Glow Background */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-20 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px]" />

            <div className="
                relative
                w-full
                max-w-7xl
                flex
                flex-col
                justify-center
                items-center
                gap-14
                rounded-[40px]
                border
                border-white/20
                bg-white/10
                backdrop-blur-2xl
                shadow-2xl
                p-12
            ">
                {/* Header */}
                <div className="text-center flex flex-col items-center gap-3">
                    <h1 className="
                    text-4xl
                    font-black
                    bg-gradient-to-r
                    from-emerald-300
                    via-emerald-500
                    to-cyan-500
                    bg-clip-text
                    text-transparent
                    ">
                        قالبت رو همین الان انتخاب کن
                    </h1>

                    <p className="
                        text-gray-500
                        text-sm"
                        >
                        یک قالب حرفه‌ای برای ساخت رزومه خودت انتخاب کن
                    </p>
                </div>
                {/* Templates */}
                <div className="
                    w-full
                    h-auto
                    flex
                    flex-row
                    flex-wrap
                    justify-center
                    items-center
                    gap-8
                ">
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
                                style={{
                                    backgroundImage: `url(${tpl.image})`
                                }}
                            >
                                <div className="
                                    absolute inset-0 
                                    bg-gradient-to-t 
                                    from-black/60 
                                    to-black/20 
                                    backdrop-blur-lg 
                                    opacity-60 
                                    hover:opacity-80 
                                    transition-all duration-500
                                "></div>

                                <h4 className="
                                    relative 
                                    z-10 
                                    text-white 
                                    text-4xl 
                                    font-bold 
                                    drop-shadow-lg
                                ">
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