"use client"
import { FaInstagram, FaLinkedin, FaTelegram, FaGithub } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    // don't show footer in login or register
    if (pathname === "/Auth/login" || pathname === "/Auth/register") {
        return null;
    }

    return (
        <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-8 md:px-20 mt-20 border-t border-gray-700">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* بخش اول - برند */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold text-green-400 tracking-wide">Karno</h1>
                    <p className="text-gray-300 text-sm leading-6">
                        کارنو یک پلتفرم مدرن برای ساخت رزومه است که به شما کمک می‌کند در کمترین زمان،
                        حرفه‌ای‌ترین نسخه از خودتان را بسازید.
                        ساده، سریع و هوشمند.
                    </p>
                </div>

                {/* بخش دوم - لینک‌ها */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold text-green-400">دسترسی سریع</h2>
                    <ul className="flex flex-col gap-2 text-gray-300">
                        <li className="hover:text-green-400 transition-all cursor-pointer">خانه</li>
                        <li className="hover:text-green-400 transition-all cursor-pointer">درباره ما</li>
                        <li className="hover:text-green-400 transition-all cursor-pointer">خدمات</li>
                        <li className="hover:text-green-400 transition-all cursor-pointer">تماس با ما</li>
                    </ul>
                </div>

                {/* بخش سوم - شبکه‌های اجتماعی */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold text-green-400">دنبال‌مان کنید</h2>
                    <div className="flex items-center gap-4 text-2xl">
                        <a href="#" className="hover:text-green-400 transition-all"><FaInstagram /></a>
                        <a href="#" className="hover:text-green-400 transition-all"><FaTelegram /></a>
                        <a href="#" className="hover:text-green-400 transition-all"><FaLinkedin /></a>
                        <a href="#" className="hover:text-green-400 transition-all"><FaGithub /></a>
                    </div>
                </div>
            </div>

            {/* خط جداکننده و کپی‌رایت */}
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} <span className="text-green-400 font-medium">Karno</span> — همه حقوق محفوظ است.
            </div>
        </footer>
    );
}
