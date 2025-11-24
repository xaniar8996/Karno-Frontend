"use client";

import { useResumeStore } from "@Store/resumeStore";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

export default function SocialLinksInput() {
  const { socialLink, addSocialLink, removeSocialLink } = useResumeStore();
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300 focus:border-black focus:bg-white transition-all outline-none";

  const handleAddSocialLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform.trim() || !url.trim()) return;

    if(new URL(url.trim())){
        addSocialLink({
            platform: platform.trim(),
            url: url.trim(),
            icon: icon.trim() || undefined,
          });
    }else{
        alert("url نادرست است")
    }

    setPlatform("");
    setUrl("");
    setIcon("");
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto px-2 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">لینک‌های اجتماعی</h2>

      <form onSubmit={handleAddSocialLink} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-700">پلتفرم</label>
          <input
            type="text"
            className={inputClass}
            placeholder="مثال: LinkedIn, GitHub, Twitter"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">آدرس URL</label>
          <input
            type="url"
            className={inputClass}
            placeholder="https://linkedin.com/in/username"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">آیکون (اختیاری)</label>
          <input
            type="text"
            className={inputClass}
            placeholder="نام کلاس آیکون یا URL تصویر"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
        >
          افزودن لینک اجتماعی
        </button>
      </form>

      {socialLink.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            لینک‌های اجتماعی اضافه شده:
          </h3>
          <div className="space-y-2">
            {socialLink.map((link, index) => (
              <div
                key={`${link.platform}-${index}`}
                className="group px-3 py-2 bg-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors"
              >
                <div className="flex flex-col gap-1 flex-1">
                  <span className="font-semibold text-gray-800">
                    {link.platform}
                  </span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 truncate"
                  >
                    {link.url}
                  </a>
                </div>
                <FaTrashCan
                  onClick={() => removeSocialLink(index)}
                  className="text-sm text-red-400 cursor-pointer transition-all hover:text-red-500 active:scale-95 opacity-0 group-hover:opacity-100 flex-shrink-0 ml-2"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
