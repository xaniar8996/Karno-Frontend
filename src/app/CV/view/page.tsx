"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import { ResumeTemplate } from "@components/CV/ResumeTemplate";
import toast from "react-hot-toast";
import Loader from "@app/loadings/loading";
import { NextAPI } from "@lib/axios";

export default function ViewResumePage() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const templateParam = searchParams.get("tpl");

  const {
    data: selectedResume,
    isLoading,
  } = useAPIQuery({
    key: ["resume-view", resumeId],
    enabled: Boolean(resumeId),
    queryFn: async () => {
      if (!resumeId) return null;

      try {
        const res = await NextAPI.get(`/api/CV/${resumeId}`);
        const data = (res as any)?.data;

        if (!data?.success || !data?.data) {
          toast.error(data?.message || "رزومه مورد نظر یافت نشد");
          return null;
        }

        return data.data;
      } catch (error) {
        console.error(error);
        toast.error("خطا در دریافت رزومه");
        throw error;
      }
    },
  });

  const initialData = useMemo(() => {
    if (!selectedResume) return null;
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
    } = selectedResume;
    return {
      personal,
      skills,
      experiences,
      projects,
      education,
      languages,
      certificate,
      interests,
      socialLink,
    };
  }, [selectedResume]);

  if (!resumeId) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-sm text-white/80">
        شناسه رزومه ارسال نشده است.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!selectedResume) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-sm text-black/80">
        رزومه‌ای برای نمایش یافت نشد.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <ResumeTemplate
          initialData={initialData || undefined}
          forceTemplate={templateParam || selectedResume.template}
        />
      </div>
    </div>
  );
}

