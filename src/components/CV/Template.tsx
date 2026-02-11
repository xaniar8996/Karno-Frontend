"use client";
import { useEffect, useMemo, forwardRef, useRef } from "react";
import { useResumeStore } from "@Store/resumeStore";
import NovaTemplate from "./Templates/Nova";
import RoyalTemplate from "./Templates/Royal";
import AuraTemplate from "./Templates/Aura";
import QuantumTemplate from "./Templates/Quantum";
import { useSearchParams } from "next/navigation";
import { ResumeState } from "@Types/resumeType";
import { NextAPI } from "@lib/axios";
import toast from "react-hot-toast";

interface ResumeTemplateProps {
  initialData?: Partial<ResumeState>;
  forceTemplate?: string;
}

export const ResumeTemplate = forwardRef<HTMLDivElement | null, ResumeTemplateProps>(
  ({ initialData, forceTemplate }, ref) => {
    const searchParams = useSearchParams();
    const tplFromQuery = searchParams.get("tpl");
    const editId = searchParams.get("editId");
    const hasHydratedRef = useRef(false);

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
      template,
      setTemplate,
      hydrate
    } = useResumeStore();

    const activeTemplate = forceTemplate || tplFromQuery || template;

    useEffect(() => {
      if (!forceTemplate && tplFromQuery && tplFromQuery !== template) {
        setTemplate(tplFromQuery);
      }
    }, [forceTemplate, tplFromQuery, template, setTemplate]);


    // Hydrate store when editId is present
    useEffect(() => {
      if (!editId || hasHydratedRef.current) return;

      const loadResume = async () => {
          try {
              const res = await NextAPI.get("/api/CV/userCV");
              const list = Array.isArray(res?.data?.data) ? res.data.data : [];
              const match = list.find((item: any) => item._id === editId);
              if (match) {
                  hydrate({
                      template: match.template || template,
                      personal: match.personal,
                      skills: match.skills,
                      experiences: match.experiences,
                      projects: match.projects,
                      education: match.education,
                      languages: match.languages,
                      certificate: match.certificate,
                      interests: match.interests,
                      socialLink: match.socialLink,
                  });
                  hasHydratedRef.current = true;
              } else {
                  toast.error("رزومه مورد نظر یافت نشد");
              }
          } catch (error) {
              console.error("Load resume for edit failed", error);
              toast.error("خطا در بارگذاری رزومه برای ویرایش");
          }
      };

      loadResume();
  }, [searchParams, hydrate, template]);

  // view or edit CV
    const CVData = useMemo(
      () =>
        initialData
          ? {
            personal: initialData.personal || personal,
            skills: initialData.skills || skills,
            experiences: initialData.experiences || experiences,
            projects: initialData.projects || projects,
            education: initialData.education || education,
            languages: initialData.languages || languages,
            certificate: initialData.certificate || certificate,
            interests: initialData.interests || interests,
            socialLink: initialData.socialLink || socialLink,
          }
          : {
            personal,
            skills,
            experiences,
            projects,
            education,
            languages,
            certificate,
            interests,
            socialLink,
          },
      [
        initialData,
        personal,
        skills,
        experiences,
        projects,
        education,
        languages,
        certificate,
        interests,
        socialLink,
      ]
    );

    return (
      <div ref={ref} className="w-full h-auto">
        {activeTemplate === "Nova" && <NovaTemplate CVData={CVData} />}
        {activeTemplate === "Royal" && <RoyalTemplate CVData={CVData} />}
        {activeTemplate === "Aura" && <AuraTemplate CVData={CVData} />}
        {activeTemplate === "Quantum" && <QuantumTemplate CVData={CVData} />}
      </div>
    );
  }
)