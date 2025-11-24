"use client";

import React, { useState } from "react";
import { useResumeStore } from "@Store/resumeStore";

const ProjectInput = () => {
  const { projects, addProject } = useResumeStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [link, setLink] = useState("");
  const [github, setGithub] = useState("");

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300 focus:border-black focus:bg-white transition-all outline-none";

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addProject({
      title,
      description,
      technologies: technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      link: link.trim() || undefined,
      github: github.trim() || undefined,
    });

    setTitle("");
    setDescription("");
    setTechnologies("");
    setLink("");
    setGithub("");
  };

  return (
    <div className="w-full h-full overflow-y-auto px-2 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">پروژه‌ها</h2>

      <form onSubmit={handleAddProject} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-700">عنوان پروژه</label>
          <input
            type="text"
            className={inputClass}
            placeholder="Dashboard مدیریتی"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">توضیحات</label>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="شرح کوتاه از پروژه و مسئولیت‌های شما"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">تکنولوژی‌ها</label>
          <input
            type="text"
            className={inputClass}
            placeholder="React, TypeScript, Tailwind"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            تکنولوژی‌ها را با ویرگول جدا کنید
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">لینک پروژه</label>
          <input
            type="url"
            className={inputClass}
            placeholder="https://example.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">لینک گیت‌هاب</label>
          <input
            type="url"
            className={inputClass}
            placeholder="https://github.com/username/project"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
        >
          افزودن پروژه
        </button>
      </form>

      {projects.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            پروژه‌های ثبت‌شده
          </h3>
          <div className="space-y-2">
            {projects.map((project, index) => (
              <div
                key={`${project.title}-${index}`}
                className="px-3 py-2 bg-gray-100 rounded-lg space-y-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-gray-800">
                    {project.title}
                  </span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      مشاهده
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-700">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-white rounded-full text-xs text-gray-600 border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectInput;
