"use client";

import { useResumeStore } from '@Store/resumeStore'
import React, { useState } from 'react'
import type { Skill } from '@Types/resumeType'
import { FaTrashCan } from "react-icons/fa6";
import { Button } from '@components/base/button';


const SkillsInput = () => {
  const { skills, addSkill, removeSkill } = useResumeStore();
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState<Skill['level']>('intermediate');

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300 focus:border-black focus:bg-white transition-all outline-none";

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillName.trim()) {
      addSkill({ name: skillName, level: skillLevel });
      setSkillName('');
    }
  };

  return (
    <div className='p-2 space-y-4'>
      <h2 className='text-lg font-semibold text-gray-800'>مهارت ها</h2>

      <form onSubmit={handleAddSkill} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-700">نام مهارت</label>
          <input
            type="text"
            className={inputClass}
            placeholder="مهارت شما ..."
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">سطح مهارت</label>
          <select
            className={inputClass}
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value as Skill['level'])}
          >
            <option value="beginner">مبتدی</option>
            <option value="intermediate">متوسط</option>
            <option value="advanced">پیشرفته</option>
            <option value="expert">متخصص</option>
          </select>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="md"
          fullWidth
          className='cursor-pointer hover:bg-blue-500 transition-all'
        >
          افزودن مهارت
        </Button>
      </form>

      {skills.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">مهارت‌های اضافه شده:</h3>
          <div className="space-y-1">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="group px-3 py-2 bg-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors"
              >
                <span>{skill.name}</span>
                <div className='w-auto flex flex-row justify-center items-center gap-3'>
                  <span className="text-xs text-gray-600">{skill.level}</span>
                  <FaTrashCan 
                    onClick={() => removeSkill(index)}
                    className="text-sm text-red-400 cursor-pointer transition-all hover:text-red-500 active:scale-95 opacity-0 group-hover:opacity-100" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsInput