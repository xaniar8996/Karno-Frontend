"use client";
import { useLevelHelper } from "@hooks/useCVLevel";
import { ResumeData } from "@Types/resumeType";

interface CVDataProps {
    CVData: ResumeData;
}

export default function RoyalTemplate({ CVData }: CVDataProps) {
    const { personal, skills, experiences, projects, education, languages, certificate, interests, socialLink } = CVData;
    const { getLevelColor, getLevelLabel } = useLevelHelper();

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 font-[Vazirmatn]">
            <div className="max-w-7xl mx-auto">
                {/* Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen rounded-xl">
                    {/* Left Sidebar - Dark */}
                    <aside className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 lg:p-12">
                        {/* Profile Section */}
                        <div className="mb-12">
                            <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-6xl font-bold text-white shadow-2xl">
                                {personal.fullName?.charAt(0) || "guest"}
                            </div>
                            <h1 className="text-3xl font-bold text-center mb-2 text-white">
                                {personal.fullName || "نام شما"}
                            </h1>
                            <p className="text-center text-cyan-400 font-medium text-lg mb-4">
                                {personal.jobTitle || "عنوان شغلی"}
                            </p>
                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                        </div>

                        {/* Contact Info */}
                        <div className="mb-10 space-y-4">
                            <h2 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
                                <span className="text-2xl">📞</span>
                                اطلاعات تماس
                            </h2>
                            {personal.email && (
                                <a href={`mailto:${personal.email}`} className="flex items-start gap-3 text-gray-300 hover:text-cyan-400 transition-colors group">
                                    <span className="text-xl mt-1">✉️</span>
                                    <span className="text-sm break-all group-hover:underline">{personal.email}</span>
                                </a>
                            )}
                            {personal.phone && (
                                <a href={`tel:${personal.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
                                    <span className="text-xl">📱</span>
                                    <span className="text-sm">{personal.phone}</span>
                                </a>
                            )}
                            {personal.address && (
                                <div className="flex items-start gap-3 text-gray-300">
                                    <span className="text-xl mt-1">📍</span>
                                    <span className="text-sm">{personal.address}</span>
                                </div>
                            )}
                        </div>

                        {/* Skills */}
                        {skills.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
                                    <span className="text-2xl">⚡</span>
                                    مهارت‌ها
                                </h2>
                                <div className="space-y-5">
                                    {skills.map((skill, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-medium text-white">{skill.name}</span>
                                                <span
                                                    className={`text-xs px-2 py-1 rounded ${getLevelColor(skill.level)}`}
                                                >
                                                    {getLevelLabel(skill.level)}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${skill.level === "expert"
                                                        ? "bg-green-500 w-full"
                                                        : skill.level === "advanced"
                                                            ? "bg-blue-500 w-3/4"
                                                            : skill.level === "intermediate"
                                                                ? "bg-yellow-500 w-1/2"
                                                                : "bg-red-500 w-1/4"
                                                        }`}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Languages */}
                        {languages.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
                                    <span className="text-2xl">🌐</span>
                                    زبان‌ها
                                </h2>
                                <div className="space-y-5">
                                    {languages.map((lang, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-gray-200">{lang.languageName}</span>
                                                <span className="text-xs text-cyan-400">{getLevelLabel(lang.level)}</span>
                                            </div>
                                            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                                                    style={{ width: getLevelColor(lang.level) }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Social Links */}
                        {socialLink.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
                                    <span className="text-2xl">🔗</span>
                                    شبکه‌های اجتماعی
                                </h2>
                                <div className="space-y-3">
                                    {socialLink.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block bg-slate-700/50 hover:bg-slate-700 px-4 py-3 rounded-lg transition-all text-sm text-gray-200 hover:text-cyan-400"
                                        >
                                            {link.platform}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-8 bg-white text-gray-900 p-8 lg:p-12">
                        {/* About Me */}
                        {personal.about && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                                    درباره من
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border-r-4 border-cyan-500">
                                    {personal.about}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {experiences.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-bold mb-8 text-slate-800 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                                    تجربیات کاری
                                </h2>
                                <div className="space-y-6">
                                    {experiences.map((exp, index) => (
                                        <div key={index} className="relative pr-8 border-r-4 border-cyan-200 hover:border-cyan-500 transition-colors">
                                            <div className="absolute -right-3 top-0 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                                            <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                                                <h3 className="text-xl font-bold text-slate-800 mb-2">{exp.jobTitle}</h3>
                                                <p className="text-cyan-600 font-semibold mb-1">{exp.company}</p>
                                                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                                                    <span>📅</span>
                                                    {exp.dateRange}
                                                </p>
                                                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {education.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-bold mb-8 text-slate-800 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                                    تحصیلات
                                </h2>
                                <div className="space-y-6">
                                    {education.map((edu, index) => (
                                        <div key={index} className="relative pr-8 border-r-4 border-purple-200 hover:border-purple-500 transition-colors">
                                            <div className="absolute -right-3 top-0 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-4 border-white shadow-lg"></div>
                                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                                                <h3 className="text-xl font-bold text-slate-800 mb-2">{edu.degree}</h3>
                                                <p className="text-purple-600 font-semibold mb-1">{edu.institute}</p>
                                                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                                                    <span>📅</span>
                                                    {edu.dateRange}
                                                </p>
                                                {edu.description && <p className="text-gray-700 leading-relaxed">{edu.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {projects.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-bold mb-8 text-slate-800 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                                    پروژه‌ها
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.map((project, index) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 hover:shadow-xl transition-all border border-slate-200 hover:border-cyan-300"
                                        >
                                            <h3 className="text-xl font-bold text-slate-800 mb-3">{project.title}</h3>
                                            <p className="text-gray-700 mb-4 leading-relaxed text-sm">{project.description}</p>
                                            {project.technologies && project.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.technologies.map((tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full font-medium"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex gap-3 pt-3 border-t border-slate-200">
                                                {project.link && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1"
                                                    >
                                                        <span>🔗</span>
                                                        مشاهده
                                                    </a>
                                                )}
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-slate-600 hover:text-slate-800 font-medium flex items-center gap-1"
                                                    >
                                                        <span>💻</span>
                                                        GitHub
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certificates */}
                        {certificate.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-bold mb-8 text-slate-800 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                                    گواهینامه‌ها
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {certificate.map((cert, index) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 hover:shadow-lg transition-all"
                                        >
                                            <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                                                <span>🏆</span>
                                                {cert.CourseName}
                                            </h3>
                                            <p className="text-sm text-amber-700 font-medium">{cert.Date}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Interests */}
                        {interests.length > 0 && interests[0]?.Description && (
                            <section>
                                <h2 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                                    علاقه‌مندی‌ها
                                </h2>
                                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border-r-4 border-green-500">
                                    <p className="text-gray-700 leading-relaxed">{interests[0].Description}</p>
                                </div>
                            </section>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
