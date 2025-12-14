"use client";
import { useEffect, useMemo, forwardRef } from "react";
import { useResumeStore } from "@Store/resumeStore";
import NovaTemplate from "./Templates/Nova";
import RoyalTemplate from "./Templates/Royal";
import AuraTemplate from "./Templates/Aura";
import { useSearchParams } from "next/navigation";
import { ResumeState } from "@Types/resumeType";

interface ResumeTemplateProps {
  initialData?: Partial<ResumeState>;
  forceTemplate?: string;
}

export const ResumeTemplate = forwardRef<HTMLDivElement | null, ResumeTemplateProps>(
  ({ initialData, forceTemplate }, ref) => {
    const searchParams = useSearchParams();
    const tplFromQuery = searchParams.get("tpl");

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
    } = useResumeStore();

    const activeTemplate = forceTemplate || tplFromQuery || template;

    useEffect(() => {
      if (!forceTemplate && tplFromQuery && tplFromQuery !== template) {
        setTemplate(tplFromQuery);
      }
    }, [forceTemplate, tplFromQuery, template, setTemplate]);

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
      </div>
    );
  }
)