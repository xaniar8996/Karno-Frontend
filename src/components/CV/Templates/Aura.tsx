"use client";
import { ResumeData } from "@Types/resumeType";
import { useLevelHelper } from "@hooks/ui/useCVLevel";
import { useRequireVerifiedAccount } from "@hooks/auth/useRequireVerifiedAccount";

interface CVDataProps {
  CVData: ResumeData;
}

export default function YellowGradientTemplate({ CVData }: CVDataProps) {
  const { getLevelColor, getLevelLabel } = useLevelHelper();
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

  useRequireVerifiedAccount();

  return (
    <div className="min-h-screen print:min-h-0 print:w-full print:max-w-none print:bg-white print:text-black bg-gradient-to-br from-yellow-50 to-gray-100 text-gray-800 font-[Vazirmatn]">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-10 print:px-4 print:py-8 grid grid-cols-1 lg:grid-cols-3 print:grid-cols-3 gap-10">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="bg-gray-900 text-white rounded-3xl p-8 shadow-2xl flex flex-col items-center">

          {/* Profile Image Circle */}
          <div className="w-36 h-36 rounded-full border-4 border-yellow-400 overflow-hidden shadow-lg mb-6">
            {personal.Image ? (
              <img
                src={personal.Image}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-yellow-300 text-3xl">
                🙂
              </div>
            )}
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold text-center mb-1">
            {personal.fullName || "نام شما"}
          </h1>
          <p className="text-yellow-300 text-lg mb-6">
            {personal.jobTitle || "عنوان شغلی"}
          </p>

          {/* Contact */}
          <div className="w-full space-y-4 mt-4">
            <h2 className="text-xl font-semibold border-b border-yellow-400 pb-2">
              اطلاعات تماس
            </h2>

            {personal.email && (
              <p className="flex items-center gap-2 text-sm">
                📧 {personal.email}
              </p>
            )}
            {personal.phone && (
              <p className="flex items-center gap-2 text-sm">📞 {personal.phone}</p>
            )}
            {personal.address && (
              <p className="flex items-center gap-2 text-sm">📍 {personal.address}</p>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="w-full mt-10">
              <h2 className="text-xl font-semibold border-b border-yellow-400 pb-2">
                مهارت‌ها
              </h2>

              <div className="mt-4 space-y-4">
                {skills.map((sk, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm">
                      <span>{sk.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getLevelColor(sk.level)}`}>
                        {getLevelLabel(sk.level)}
                      </span>
                    </div>

                    <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
                      <div
                        className={`h-2 rounded-full ${sk.level === "expert"
                          ? "bg-green-400 w-full"
                          : sk.level === "advanced"
                            ? "bg-blue-400 w-3/4"
                            : sk.level === "intermediate"
                              ? "bg-yellow-300 w-1/2"
                              : "bg-red-400 w-1/4"
                          }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="w-full mt-10">
              <h2 className="text-xl font-semibold border-b border-yellow-400 pb-2">
                زبان‌ها
              </h2>

              <div className="mt-4 space-y-3">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span>{lang.languageName}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getLevelColor(lang.level)}`}
                    >
                      {getLevelLabel(lang.level)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}



          {/* Interests */}
          {interests.length > 0 && (
            <div className="w-full mt-10">
              <h2 className="text-xl font-semibold border-b border-yellow-400 pb-2">
                علاقه‌مندی‌ها
              </h2>
              <ul className="mt-4 text-sm space-y-2">
                {interests.map((int, i) => (
                  <li key={i}>• {int.Description}</li>
                ))}
              </ul>
            </div>
          )}

          {socialLink.length > 0 && (
            <div className="w-full mt-10">
              <h2 className="text-xl font-semibold border-b border-yellow-400 pb-2">
                شبکه‌های اجتماعی
              </h2>

              <div className="mt-4 space-y-2">
                {socialLink.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    className="
            block text-sm bg-white/10 
            hover:bg-yellow-400 hover:text-black
            transition rounded-lg px-3 py-2
          "
                  >
                    🔗 {item.platform}
                  </a>
                ))}
              </div>
            </div>
          )}


        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="lg:col-span-2 space-y-10">

          {/* About */}
          {personal.about && (
            <section className="bg-white rounded-3xl p-8 shadow-xl border border-yellow-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-yellow-600">
                📝 پروفایل
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">{personal.about}</p>
            </section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <section className="bg-white rounded-3xl p-8 shadow-xl border border-yellow-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-600">
                💼 تجربه کاری
              </h2>

              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <div key={i} className="border-r-4 border-yellow-400 pr-6 relative">
                    <div className="absolute top-1 right-[-10px] w-5 h-5 bg-yellow-400 rounded-full"></div>

                    <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                    <p className="text-yellow-700 text-sm">{exp.company}</p>
                    <p className="text-gray-400 text-xs mb-2">{exp.dateRange}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="bg-white rounded-3xl p-8 shadow-xl border border-yellow-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-600">
                🎓 تحصیلات
              </h2>

              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i} className="border-r-4 border-yellow-300 pr-6">
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="text-yellow-700 text-sm">{edu.institute}</p>
                    <p className="text-gray-400 text-xs mb-2">{edu.dateRange}</p>
                    {edu.description && (
                      <p className="text-gray-700 text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {certificate.length > 0 && (
            <section className="bg-white rounded-3xl p-8 shadow-xl border border-yellow-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-600">
                🏆 گواهینامه‌ها
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificate.map((cert, i) => (
                  <div
                    key={i}
                    className="
            border border-yellow-200 
            rounded-xl p-4 
            hover:shadow-lg transition
          "
                  >
                    <h3 className="font-semibold text-sm">{cert.CourseName}</h3>
                    <p className="text-xs text-gray-500 mt-1">{cert.Date}</p>

                    {cert.Image && (
                      <a
                        href={cert.Image}
                        target="_blank"
                        className="inline-block mt-2 text-xs text-yellow-700 hover:underline"
                      >
                        مشاهده گواهینامه
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}


          {/* Projects */}
          {projects.length > 0 && (
            <section className="bg-white rounded-3xl p-8 shadow-xl border border-yellow-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-600">
                🚀 پروژه‌ها
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((pr, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-semibold">{pr.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{pr.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {pr.technologies?.map((t, ti) => (
                        <span
                          key={ti}
                          className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 text-xs mt-3">
                      {pr.link && (
                        <a href={pr.link} className="text-yellow-700 hover:underline">
                          🔗 لینک پروژه
                        </a>
                      )}
                      {pr.github && (
                        <a href={pr.github} className="text-gray-700 hover:underline">
                          💻 GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
