"use client";
import { ResumeData } from "@Types/resumeType";
import { useLevelHelper } from "@hooks/useCVLevel";
import { useRequireVerifiedAccount } from "@hooks/useRequireVerifiedAccount";

interface CVDataProps {
    CVData: ResumeData;
}

export default function QuantumTemplate({ CVData }: CVDataProps) {
    const {
        personal,
        skills,
        experiences,
        projects,
        education,
        languages,
        certificate,
        interests,
        socialLink,
    } = CVData;

    const { getLevelColor, getLevelLabel } = useLevelHelper();
    useRequireVerifiedAccount();

    return (
        <div className="min-h-screen bg-[#0b0e14] text-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

                {/* ================= HERO ================= */}
                <section className="w-full flex flex-row justify-between items-center items-center gap-1">
                    <div className="space-y-6 w-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            {personal.fullName || "نام شما"}
                        </h1>

                        <p className="text-cyan-300 text-lg">
                            {personal.jobTitle || "عنوان شغلی"}
                        </p>

                        {personal.about && (
                            <p className="text-gray-400 leading-relaxed max-w-xl">
                                {personal.about}
                            </p>
                        )}

                        {/* Social */}
                        {socialLink.length > 0 && (
                            <div className="flex flex-wrap gap-3 pt-4">
                                {socialLink.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.url}
                                        target="_blank"
                                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 transition"
                                    >
                                        {s.platform}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Profile Card */}
                    <div className="w-auto bg-gradient-to-br from-cyan-500 to-purple-600 blur-2xl opacity-30"></div>
                    <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 flex flex-col justify-center text-center gap-4">
                        {personal.Image && (
                            <img
                                src={personal.Image}
                                className="w-36 h-36 mx-auto rounded-full object-cover mb-4"
                            />
                        )}
                        <p className="text-sm text-gray-400">{personal.email}📨</p>
                        <p className="text-sm text-gray-400">{personal.phone}📞</p>
                        <p className="text-sm text-gray-400">{personal.address}🏠</p>
                    </div>
                </section>
                {/* ================= EXPERIENCE TIMELINE ================= */}
                {experiences.length > 0 && (
                    <section className="w-auto flex flex-row justify-center items-start gap-5">
                        <div className="w-full">
                            <h2 className="text-2xl font-bold mb-8 text-cyan-400">
                                سابقه شغلی
                            </h2>

                            <div className="grid grid-cols-1 gap-6 overflow-x-auto pb-4 w-full">
                                {experiences.map((exp, i) => (
                                    <div
                                        key={i}
                                        className="min-w-[280px] bg-[#111827] border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition"
                                    >
                                        <span className="text-xs text-cyan-300">
                                            {exp.dateRange}
                                        </span>
                                        <h3 className="text-lg font-semibold mt-2">
                                            {exp.jobTitle}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-3">
                                            {exp.company}
                                        </p>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ================= certificates ================= */}
                        {certificate.length > 0 && (
                            <section className="w-full">
                                <h2 className="text-2xl font-bold mb-8 text-cyan-400">
                                    گواهینامه ها
                                </h2>

                                <div className="grid md:grid-cols-1 gap-6 w-full">
                                    {certificate.map((cer, i) => (
                                        <div
                                            key={i}
                                            className="w-full bg-[#111827] border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition"
                                        >
                                            <h3 className="font-semibold">{cer.CourseName}</h3>
                                            <p className="text-sm text-gray-400">{cer.Date}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </section>
                )}

                {/* ================= SKILLS ================= */}
                {skills.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-8 text-cyan-400">
                            مهارت ها
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {skills.map((sk, i) => (
                                <div
                                    key={i}
                                    className="bg-[#111827] border border-white/10 rounded-xl p-4 hover:scale-105 transition"
                                >
                                    <p className="font-medium">{sk.name}</p>
                                    <span
                                        className={`inline-block mt-2 text-xs px-2 py-1 rounded ${getLevelColor(
                                            sk.level
                                        )}`}
                                    >
                                        {getLevelLabel(sk.level)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= PROJECTS ================= */}
                {projects.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-8 text-cyan-400">
                            پروژه ها
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {projects.map((pr, i) => (
                                <div
                                    key={i}
                                    className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#111827]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition"></div>

                                    <div className="relative p-6 space-y-3">
                                        <h3 className="text-xl font-semibold">
                                            {pr.title}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {pr.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {pr.technologies?.map((t, ti) => (
                                                <span
                                                    key={ti}
                                                    className="text-xs px-2 py-1 rounded bg-white/10"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-4 text-sm pt-2">
                                            {pr.link && (
                                                <a href={pr.link} className="text-cyan-400">
                                                    Live
                                                </a>
                                            )}
                                            {pr.github && (
                                                <a href={pr.github} className="text-gray-400">
                                                    GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= Education ================= */}
                {education.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-8 text-cyan-400">
                            تحصیلات
                        </h2>

                        <div className="space-y-4 grid grid-cols-2 justify-center gap-5">
                            {education.map((ed, i) => (
                                <div
                                    key={i}
                                    className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full h-32 max-h-32"
                                >
                                    <h3 className="text-lg font-semibold">{ed.degree}</h3>
                                    <p className="text-sm text-gray-400">{ed.institute}</p>
                                    <span className="text-xs text-cyan-300">{ed.dateRange}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= languages ================= */}
                {languages.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-8 text-cyan-400">
                            زبان ها
                        </h2>

                        <div className="flex flex-wrap gap-4">
                            {languages.map((lang, i) => (
                                <div
                                    key={i}
                                    className="px-4 py-3 rounded-xl bg-[#111827] border border-white/10"
                                >
                                    <p className="font-medium">{lang.languageName}</p>
                                    <span
                                        className={`text-xs mt-1 inline-block px-2 py-1 rounded ${getLevelColor(
                                            lang.level
                                        )}`}
                                    >
                                        {getLevelLabel(lang.level)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= interests ================= */}
                {interests.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-8 text-cyan-400">
                            علایق
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {interests.map((item, i) => (
                                <span
                                    key={i}
                                    className="p-8 rounded-full bg-white/5 border border-white/10 text-sm"
                                >
                                    {item.Description}
                                </span>
                            ))}
                        </div>
                    </section>
                )}


                {/* ================= FOOTER ================= */}
                <footer className="text-center text-xs text-gray-500 ">
                    © {new Date().getFullYear()} {personal.fullName}
                </footer>
            </div>
        </div>
    );
}
