"use client";

import { MiniLoader } from "@app/loadings/loading";
import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import { NextAPI } from "@lib/axios";
import { templatesData } from "@data/TemplatesData";
import { ResumeData } from "@Types/resumeType";

type TemplateMeta = {
  id: string;
  name: string;
  image: string;
};

const templatesMap: Record<string, TemplateMeta> = Object.fromEntries(
  templatesData.map((t) => [t.id, t])
) as Record<string, TemplateMeta>;

async function getAllCVs() {
  try {
    const response = await NextAPI.get("/api/CV/allCvs");
    return response?.data as ResumeData[] | null;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default function AdminAnalyticsPage() {
  const {
    data: allCVs,
    isLoading,
    isError,
    error,
  } = useAPIQuery<ResumeData[] | null>({
    key: ["allCVs-analytics"],
    queryFn: getAllCVs,
  });

  const cvs: ResumeData[] = Array.isArray(allCVs) ? allCVs : [];

  const totalCVs = cvs.length;

  const totalSkills = cvs.reduce((sum, cv) => sum + (cv.skills?.length ?? 0), 0);
  const totalExperiences = cvs.reduce(
    (sum, cv) => sum + (cv.experiences?.length ?? 0),
    0
  );
  const totalProjects = cvs.reduce(
    (sum, cv) => sum + (cv.projects?.length ?? 0),
    0
  );
  const totalEducations = cvs.reduce(
    (sum, cv) => sum + (cv.education?.length ?? 0),
    0
  );

  const avg = (value: number) => (totalCVs > 0 ? (value / totalCVs).toFixed(1) : "0");

  // توزیع قالب‌ها
  const templateUsageMap = cvs.reduce<Record<string, number>>((acc, cv) => {
    const tpl = cv.template || "UNKNOWN";
    acc[tpl] = (acc[tpl] ?? 0) + 1;
    return acc;
  }, {});

  const templateUsageEntries = Object.entries(templateUsageMap).sort(
    (a, b) => b[1] - a[1]
  );

  const maxTemplateCount =
    templateUsageEntries.length > 0 ? templateUsageEntries[0][1] : 0;

  return (
    <div className="w-full h-full p-5 px-9 space-y-8 text-white">
      <h1 className="text-2xl font-semibold">آنالیتیکس و گزارش‌ها</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <MiniLoader />
        </div>
      ) : isError ? (
        <div className="w-full rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-800 shadow-sm flex items-start gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-500">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M11 7h2v6h-2zm0 8h2v2h-2z" />
              <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Z" />
            </svg>
          </span>
          <div className="space-y-1">
            <p className="font-medium">خطا در بارگیری داده‌های آنالیتیکس</p>
            <p className="text-xs text-red-600">
              {error?.message ?? "لطفاً چند لحظه دیگر دوباره تلاش کنید."}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* کارت‌های خلاصه */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-700/60 px-5 py-4 shadow-md">
              <p className="text-sm text-zinc-400 mb-2">تعداد کل رزومه‌ها</p>
              <p className="text-3xl font-bold">{totalCVs}</p>
            </div>

            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-700/60 px-5 py-4 shadow-md">
              <p className="text-sm text-zinc-400 mb-2">
                میانگین تعداد مهارت در هر رزومه
              </p>
              <p className="text-3xl font-bold">{avg(totalSkills)}</p>
              <p className="text-xs text-zinc-500 mt-1">
                مجموع مهارت‌ها: {totalSkills}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-700/60 px-5 py-4 shadow-md">
              <p className="text-sm text-zinc-400 mb-2">
                میانگین تجربیات کاری در هر رزومه
              </p>
              <p className="text-3xl font-bold">{avg(totalExperiences)}</p>
              <p className="text-xs text-zinc-500 mt-1">
                مجموع تجربیات: {totalExperiences}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-700/60 px-5 py-4 shadow-md">
              <p className="text-sm text-zinc-400 mb-2">
                میانگین پروژه‌ها در هر رزومه
              </p>
              <p className="text-3xl font-bold">{avg(totalProjects)}</p>
              <p className="text-xs text-zinc-500 mt-1">
                مجموع پروژه‌ها: {totalProjects}
              </p>
            </div>
          </section>

          {/* تحصیلات به صورت جداگانه */}
          <section className="grid grid-cols-1 md:grid-cols-1 gap-5">
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-700/60 px-5 py-4 shadow-md">
              <p className="text-sm text-zinc-400 mb-2">
                میانگین تحصیلات در هر رزومه
              </p>
              <p className="text-3xl font-bold">{avg(totalEducations)}</p>
              <p className="text-xs text-zinc-500 mt-1">
                مجموع رکوردهای تحصیلی: {totalEducations}
              </p>
            </div>
          </section>

          {/* توزیع قالب‌ها */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">محبوبیت قالب‌ها</h2>
              <p className="text-xs text-zinc-400">
                بر اساس تعداد رزومه‌های ساخته‌شده
              </p>
            </div>

            {templateUsageEntries.length === 0 ? (
              <p className="text-sm text-zinc-400">
                هنوز رزومه‌ای در سیستم ثبت نشده است.
              </p>
            ) : (
              <div className="space-y-3">
                {templateUsageEntries.map(([templateId, count]) => {
                  const meta = templatesMap[templateId];
                  const percentage =
                    totalCVs > 0 ? Math.round((count / totalCVs) * 100) : 0;
                  const barWidth =
                    maxTemplateCount > 0
                      ? `${Math.max(8, (count / maxTemplateCount) * 100)}%`
                      : "0%";

                  return (
                    <div
                      key={templateId}
                      className="rounded-2xl bg-zinc-900/40 border border-zinc-800 px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3 min-w-0">
                          {meta?.image && (
                            <img
                              src={meta.image}
                              alt={meta.name}
                              className="h-10 w-16 rounded-lg object-cover border border-zinc-700/60"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {meta?.name ?? templateId}
                            </p>
                            <p className="text-xs text-zinc-500">
                              شناسه قالب: {templateId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-semibold">
                            {count} رزومه
                          </p>
                          <p className="text-xs text-zinc-500">
                            {percentage}% از کل رزومه‌ها
                          </p>
                        </div>
                      </div>

                      <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                          style={{ width: barWidth }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}