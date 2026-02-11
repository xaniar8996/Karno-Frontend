import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { LuShieldAlert } from "react-icons/lu";
import { FaChartSimple } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";


export const Sidebar_Data = [
    {
      title: "داشبورد",
      key: "dashboard",
      path: "/admin",
      icon: RiDashboardFill,
    },
    {
      title: "مدیریت کاربران",
      key: "users",
      path: "/admin/users",
      icon: FaUsers,
    },
    {
      title: "مدیریت رزومه‌ها",
      key: "resumes",
      path: "/admin/resumes",
      icon: FiFileText,
    },
    {
      title: "مدیریت قالب‌ها",
      key: "templates",
      path: "/admin/templates",
      icon: FaPalette,
    },
    {
      title: "مهارت‌ها و سطوح",
      key: "skills",
      path: "/admin/skills",
      icon: IoLayers,
    },
    {
      title: "نظارت محتوا",
      key: "moderation",
      path: "/admin/moderation",
      icon: LuShieldAlert,
    },
    {
      title: "آنالیتیکس و گزارش‌ها",
      key: "analytics",
      path: "/admin/analytics",
      icon: FaChartSimple,
    },
    {
      title: "پرداخت‌ها و پلن‌ها",
      key: "payments",
      path: "/admin/payments",
      icon: FaRegCreditCard,
    },
    {
      title: "نوتیفیکیشن و ایمیل‌ها",
      key: "notifications",
      path: "/admin/notifications",
      icon: IoIosNotifications,
    },
    {
      title: "لاگ‌ها و امنیت",
      key: "logs",
      path: "/admin/logs",
      icon: FaUnlockKeyhole,
    },
    {
      title: "نقش‌ها و دسترسی‌ها",
      key: "roles",
      path: "/admin/roles",
      icon: FaUserCog,
    },
  ];
  