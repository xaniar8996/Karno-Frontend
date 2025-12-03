"use client";
import { ResumeData } from "@Types/resumeType";
import { useLevelHelper } from "@hooks/useCVLevel";

interface CVDataProps {
  CVData: ResumeData;
}

export default function NovaTemplate({ CVData }: CVDataProps) {
  const { personal, skills, experiences, projects, education, languages, certificate, interests, socialLink } = CVData;
  const { getLevelColor, getLevelLabel } = useLevelHelper();


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-[Vazirmatn]">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {personal.fullName || "نام شما"}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              {personal.jobTitle || "عنوان شغلی"}
            </p>
            {personal.about && (
              <p className="text-blue-50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                {personal.about}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
              >
                <span>📧</span>
                <span>{personal.email}</span>
              </a>
            )}
            {personal.phone && (
              <a
                href={`tel:${personal.phone}`}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
              >
                <span>📞</span>
                <span>{personal.phone}</span>
              </a>
            )}
            {personal.address && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span>📍</span>
                <span>{personal.address}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          {socialLink.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {socialLink.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all text-sm"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experience Section */}
            {experiences.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-blue-500 flex items-center gap-2">
                  <span className="text-blue-600">💼</span>
                  تجربیات کاری
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-blue-200">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                      <p className="text-blue-600 font-medium mb-1">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{exp.dateRange}</p>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-green-500 flex items-center gap-2">
                  <span className="text-green-600">🎓</span>
                  تحصیلات
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-green-200">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-green-600 font-medium mb-1">{edu.institute}</p>
                      <p className="text-sm text-gray-500 mb-2">{edu.dateRange}</p>
                      {edu.description && (
                        <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-purple-500 flex items-center gap-2">
                  <span className="text-purple-600">🚀</span>
                  پروژه‌ها
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                      )}
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                        {project.description}
                      </p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-3 mt-3">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            🔗 مشاهده پروژه
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 hover:text-gray-800"
                          >
                            💻 GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills Section */}
            {skills.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
                  مهارت‌ها
                </h2>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
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
              </section>
            )}

            {/* Languages Section */}
            {languages.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
                  زبان‌ها
                </h2>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {lang.languageName}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getLevelColor(lang.level)}`}
                      >
                        {getLevelLabel(lang.level)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certificates Section */}
            {certificate.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
                  گواهینامه‌ها
                </h2>
                <div className="space-y-3">
                  {certificate.map((cert, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">
                        {cert.CourseName}
                      </h3>
                      <p className="text-xs text-gray-500">{cert.Date}</p>
                      {cert.Image && (
                        <a
                          href={cert.Image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 mt-2 inline-block"
                        >
                          مشاهده گواهینامه
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interests Section */}
            {interests.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
                  علاقه‌مندی‌ها
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {interests[0]?.Description}
                </p>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} {personal.fullName || "رزومه"}.</p>
        </footer>
      </div>
    </div>
  );
}
