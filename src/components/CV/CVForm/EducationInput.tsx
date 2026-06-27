"use client";

import React, { useState } from "react";
import { useResumeStore } from "@Store/resumeStore";
import { Button } from "@components/base/button";

const EducationInput = () => {
  const { education, addEducation } = useResumeStore();
  const [degree, setDegree] = useState("");
  const [institute, setInstitute] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [description, setDescription] = useState("");

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300 focus:border-black focus:bg-white transition-all outline-none";

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!degree.trim() || !institute.trim()) return;

    addEducation({
      degree,
      institute,
      dateRange,
      description,
    });

    setDegree("");
    setInstitute("");
    setDateRange("");
    setDescription("");
  };

  return (
    <div className="w-full h-full overflow-y-auto px-2 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">تحصیلات</h2>

      <form onSubmit={handleAddEducation} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-700">مقطع تحصیلی</label>
          <input
            type="text"
            className={inputClass}
            placeholder="کارشناسی نرم‌افزار"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">دانشگاه / موسسه</label>
          <input
            type="text"
            className={inputClass}
            placeholder="دانشگاه تهران"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">بازه زمانی</label>
          <input
            type="text"
            className={inputClass}
            placeholder="1395 - 1399"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">توضیحات</label>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="توضیح کوتاه درباره دستاوردها یا دروس مهم..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="md"
          fullWidth
          className='cursor-pointer hover:bg-blue-500 transition-all'
        >
          افزودن تحصیلات
        </Button>
      </form>

      {education.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            سوابق آموزشی ثبت‌شده
          </h3>
          <div className="space-y-2">
            {education.map((edu, index) => (
              <div
                key={`${edu.degree}-${index}`}
                className="px-3 py-2 bg-gray-100 rounded-lg flex flex-col gap-1"
              >
                <span className="font-semibold text-gray-800">
                  {edu.degree} - {edu.institute}
                </span>
                <span className="text-xs text-gray-600">{edu.dateRange}</span>
                {edu.description && (
                  <p className="text-sm text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationInput;
