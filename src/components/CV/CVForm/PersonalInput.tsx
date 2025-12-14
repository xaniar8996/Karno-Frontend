"use client";

import React from "react";
import { useResumeStore } from "@Store/resumeStore";

type PersonalInputProps = {
  onPhotoChange: (file: File | null) => void;
};

const PersonalInput = ({ onPhotoChange }: PersonalInputProps) => {
  const { personal, setPersonalField } = useResumeStore();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onPhotoChange(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalField("Image", reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPersonalField("Image", "");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300 focus:border-black focus:bg-white transition-all outline-none";
  
  return (
    <div className="w-full h-full overflow-y-auto px-2 space-y-4">
      
      {/* عنوان */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        اطلاعات شخصی
      </h2>

      {/* عکس */}
      <div className="space-y-1">
        <label className="text-sm text-gray-700">آپلود عکس</label>
        <input
          type="file"
          accept="image/*"
          className={inputClass}
          onChange={handleImageChange}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-700">نام و نام خانوادگی</label>
        <input
          type="text"
          className={inputClass}
          placeholder="مثال: حسین محمدی"
          value={personal.fullName}
          onChange={(e) => setPersonalField("fullName", e.target.value)}
        />
      </div>

      {/* شغل یا عنوان */}
      <div className="space-y-1">
        <label className="text-sm text-gray-700">عنوان شغلی</label>
        <input
          type="text"
          className={inputClass}
          placeholder="برنامه‌نویس فرانت‌اند"
          value={personal.jobTitle}
          onChange={(e) => setPersonalField("jobTitle", e.target.value)}
        />
      </div>

      {/* ایمیل */}
      <div className="space-y-1">
        <label className="text-sm text-gray-700">ایمیل</label>
        <input
          type="email"
          className={inputClass}
          placeholder="example@gmail.com"
          value={personal.email}
          onChange={(e) => setPersonalField("email", e.target.value)}
        />
      </div>

      {/* شماره تماس */}
      <div className="space-y-1">
        <label className="text-sm text-gray-700">شماره تماس</label>
        <input
          type="text"
          className={inputClass}
          placeholder="09XX XXX XXXX"
          value={personal.phone}
          onChange={(e) => setPersonalField("phone", e.target.value)}
        />
      </div>

      {/* آدرس */}
      <div className="space-y-1">
        <label className="text-sm text-gray-700">آدرس</label>
        <input
          type="text"
          className={inputClass}
          placeholder="تهران، ایران"
          value={personal.address}
          onChange={(e) => setPersonalField("address", e.target.value)}
        />
      </div>

      {/* توضیحات */}
      <div className="space-y-1">
        <label className="text-sm text-gray-700">درباره من</label>
        <textarea
          rows={4}
          className={inputClass}
          placeholder="یک توضیح کوتاه درباره خودتان بنویسید..."
          value={personal.about}
          onChange={(e) => setPersonalField("about", e.target.value)}
        />
      </div>
    </div>
  );
};

export default PersonalInput;
