// src/types/resume.ts

import { JSX } from "react/jsx-runtime";

export interface PersonalInfos {
  Image: string;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  address: string;
  about: string;
}

export interface Experience {
  jobTitle: string;
  company: string;
  dateRange: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface Education {
  degree: string;
  institute: string;
  dateRange: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface Certificate {
  CourseName: string,
  Image?: string,
  Date: string,
}

export interface Languages {
  languageName: string,
  level: "beginner" | "midlevel" | "advanced" | "expert"
}

export interface Interests {
  Description: string
}


export interface ResumeData {
  // made _id optional
  _id?: string;
  template: string;
  personal: PersonalInfos;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  socialLink: SocialLink[];
  certificate: Certificate[];
  languages: Languages[];
  interests: Interests[];
}

export interface ResumeState extends ResumeData {
  template: string;
  setTemplate: (template: string) => void;
  setPersonalField: (field: keyof PersonalInfos, value: string) => void;
  addSkill: (skill: Skill) => void;
  removeSkill: (index: number) => void;
  addExperience: (exp: Experience) => void;
  addProject: (project: Project) => void;
  addEducation: (edu: Education) => void;
  addSocialLink: (social: SocialLink) => void;
  removeSocialLink: (index: number) => void;
  addcertificate: (cer: Certificate) => void;
  removecertificate: (index: number) => void;
  addLanguages: (lan: Languages) => void;
  removeLanguages: (index: number) => void;
  addinterests: (interest: Interests) => void;
  removeInterests: (index: number) => void;
  hydrate: (data: Partial<ResumeState>) => void;
  reset: () => void;
}