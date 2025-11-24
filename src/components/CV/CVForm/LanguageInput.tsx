"use client";

import { useResumeStore } from "@Store/resumeStore";
import React, { useState } from "react";
import type { Languages } from "@Types/resumeType";
import { FaTrashCan } from "react-icons/fa6";

export default function LanguageInput() {
  const { languages, addLanguages, removeLanguages } = useResumeStore();
  const [languageName, setLanguageName] = useState("");
  const [languageLevel, setLanguageLevel] = useState<Languages["level"]>("midlevel");

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300 focus:border-black focus:bg-white transition-all outline-none";

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!languageName.trim()) return;

    addLanguages({
      languageName: languageName.trim(),
      level: languageLevel,
    });

    setLanguageName("");
    setLanguageLevel("midlevel");
  };

  const getLevelLabel = (level: Languages["level"]) => {
    const labels = {
      beginner: "مبتدی",
      midlevel: "متوسط",
      advanced: "پیشرفته",
      expert: "متخصص",
    };
    return labels[level];
  };

  return (
    <div className="w-full h-full overflow-y-auto px-2 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">زبان‌ها</h2>

      <form onSubmit={handleAddLanguage} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-700">نام زبان</label>
          <input
            type="text"
            className={inputClass}
            placeholder="مثال: انگلیسی، فرانسوی، آلمانی"
            value={languageName}
            onChange={(e) => setLanguageName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">سطح تسلط</label>
          <select
            className={inputClass}
            value={languageLevel}
            onChange={(e) => setLanguageLevel(e.target.value as Languages["level"])}
          >
            <option value="beginner">مبتدی</option>
            <option value="midlevel">متوسط</option>
            <option value="advanced">پیشرفته</option>
            <option value="expert">متخصص</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
        >
          افزودن زبان
        </button>
      </form>

      {languages.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            زبان‌های اضافه شده:
          </h3>
          <div className="space-y-2">
            {languages.map((language, index) => (
              <div
                key={`${language.languageName}-${index}`}
                className="group px-3 py-2 bg-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors"
              >
                <div className="flex flex-col gap-1 flex-1">
                  <span className="font-semibold text-gray-800">
                    {language.languageName}
                  </span>
                </div>
                <div className="w-auto flex flex-row justify-center items-center gap-3">
                  <span className="text-xs text-gray-600">
                    {getLevelLabel(language.level)}
                  </span>
                  <FaTrashCan
                    onClick={() => removeLanguages(index)}
                    className="text-sm text-red-400 cursor-pointer transition-all hover:text-red-500 active:scale-95 opacity-0 group-hover:opacity-100 flex-shrink-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

