"use client";
import { useEffect } from "react";
import { useResumeStore } from "@Store/resumeStore";
import NovaTemplate from "./Templates/Nova";
import RoyalTemplate from "./Templates/Royal";
import AuraTemplate from "./Templates/Aura";
import { useSearchParams } from "next/navigation";


export default function ResumeTemplate() {
  const searchParams = useSearchParams();
  const tpl = searchParams.get("tpl");
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

  // Save template to store when URL param changes
  useEffect(() => {
    if (tpl && tpl !== template) {
      setTemplate(tpl);
    }
  }, [tpl, template, setTemplate]);

  const CVData = {
    personal,
    skills,
    experiences,
    projects,
    education,
    languages,
    certificate,
    interests,
    socialLink,
  }

  return (
    <div className="w-full h-auto">
      {tpl === "Nova" && <NovaTemplate CVData={CVData} />}
      {tpl === "Royal" && <RoyalTemplate CVData={CVData} />}
      {tpl === "Aura" && <AuraTemplate CVData={CVData} />}
    </div>
  );
}
