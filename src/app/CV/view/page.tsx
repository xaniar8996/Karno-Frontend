"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAPIQuery } from "@hooks/useAPIQuery";
import { ResumeTemplate } from "@components/CV/Template";
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
      try {
        const res = await NextAPI.get("/api/CV/userCV");
        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        if (!list.length) return null;
        const match = list.find((item: any) => item._id === resumeId);
        if (!match) {
          toast.error("رزومه مورد نظر یافت نشد");
        }
        return match || null;
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
      <div className="w-full min-h-screen flex items-center justify-center text-sm text-white/80">
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

