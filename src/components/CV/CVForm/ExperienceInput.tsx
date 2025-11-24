import React, { useState } from 'react'
import { useResumeStore } from '@Store/resumeStore'

const ExperienceInput = () => {

  const { experiences, addExperience } = useResumeStore();
  const [jobTitle, setJobTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !company.trim()) return;

    addExperience({
      jobTitle,
      company,
      dateRange,
      description
    });

    setJobTitle("");
    setCompany("")
    setDateRange("");
    setDescription("");
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300 focus:border-black focus:bg-white transition-all outline-none";

  return (
    <div className="w-full h-full overflow-y-auto px-2 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">تحصیلات</h2>

      <form onSubmit={handleAddExperience} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-700">عنوان شغلی</label>
          <input
            type="text"
            className={inputClass}
            placeholder="عنوان شغل"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">شرکت / سازمان</label>
          <input
            type="text"
            className={inputClass}
            placeholder="نام سازمان"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
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
            placeholder="توضیح دستاورد های شغلی..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
        >
          افزودن سابقه
        </button>
      </form>

      {experiences.length > 0 && (
        <div className="space-y-2 w-full flex flex-col justify-center items-center">
          <h3 className="text-sm font-medium text-gray-700">
            سوابق آموزشی ثبت‌شده
          </h3>
          <div className="space-y-2 w-full flex flex-col justify-center items-center w-full">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-gray-100 rounded-lg flex flex-col gap-1 w-full"
              >
                <div className='w-auto h-auto flex flex-col justify-start items-start gap-2'>
                  <h5 className='font-bold text-lg'>{exp.jobTitle}</h5>
                    <span className='text-md text-gray-700'><b className='text-blue-800'>{exp.company}</b> - {exp.dateRange}</span>
                  {exp.description && (
                    <p className='text-sm'>{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ExperienceInput