import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  ResumeState,
  Skill,
  Experience,
  Project,
  Education,
  SocialLink,
  PersonalInfos,
  Certificate,
  Languages,
  Interests
} from "../Types/resumeType";
import { getAccessToken } from "@lib/auth";
import decodeJWTPayload from "@utils/usedecodeJWT";

const rawToken = getAccessToken();

let userId = "guest";

if (typeof window !== "undefined" && rawToken) {
  const payload = decodeJWTPayload(rawToken);
  userId =
    payload?.id ||
    payload?.userId ||
    payload?.sub ||
    "guest";
}

export const resumeStoreStorageKey = `resume-store-userId=${userId}`;

const createInitialState = () => ({
  template: "",
  personal: {
    Image:"",
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    address: "",
    about: "",
  },
  skills: [] as Skill[],
  experiences: [] as Experience[],
  projects: [] as Project[],
  education: [] as Education[],
  socialLink: [] as SocialLink[],
  certificate: [] as Certificate[],
  languages: [] as Languages[],
  interests: [] as Interests[],
});

export const useResumeStore = create<ResumeState>()(
  persist<ResumeState>(
    (set) => ({
      ...createInitialState(),

      setTemplate: (template: string) =>
        set({ template }),

      setPersonalField: (field: keyof PersonalInfos, value: string) =>
        set((state: ResumeState) => ({
          personal: { ...state.personal, [field]: value },
        })),

      addSkill: (skill: Skill) =>
        set((state) => ({ skills: [...state.skills, skill] })),
      removeSkill: (index: number) =>
        set((state) => ({ skills: state.skills.filter((_, i) => i !== index) })),
      addExperience: (exp: Experience) =>
        set((state) => ({ experiences: [...state.experiences, exp] })),
      addProject: (project: Project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      addEducation: (edu: Education) =>
        set((state) => ({ education: [...state.education, edu] })),
      addSocialLink: (social: SocialLink) =>
        set((state) => ({ socialLink: [...state.socialLink, social] })),
      removeSocialLink: (index: number) =>
        set((state) => ({ socialLink: state.socialLink.filter((_, i) => i !== index) })),
      addcertificate: (cer: Certificate) =>
        set((state) => ({ certificate: [...state.certificate, cer] })),
      removecertificate: (index: number) =>
        set((state) => ({ certificate: state.certificate.filter((_, i) => i !== index) })),
      addLanguages: (lan: Languages) =>
        set((state) => ({ languages: [...state.languages, lan] })),
      removeLanguages: (index: number) =>
        set((state) => ({ languages: [...state.languages.filter((_, i) => i !== index)] })),

      addinterests: (interest: Interests) =>
        set((state) => ({ interests: [...state.interests, interest] })),
      removeInterests: (index: number) =>
        set((state) => ({ interests: [...state.interests.filter((_, i) => i !== index)] })),

      hydrate: (data: Partial<ResumeState>) =>
        set((state) => ({
          ...state,
          template: data.template ?? state.template,
          personal: data.personal ?? state.personal,
          skills: data.skills ?? state.skills,
          experiences: data.experiences ?? state.experiences,
          projects: data.projects ?? state.projects,
          education: data.education ?? state.education,
          socialLink: data.socialLink ?? state.socialLink,
          certificate: data.certificate ?? state.certificate,
          languages: data.languages ?? state.languages,
          interests: data.interests ?? state.interests,
        })),

      reset: () => {
        set(() => createInitialState());
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(resumeStoreStorageKey);
        }
      },
    }),
    {
      name: resumeStoreStorageKey,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") return localStorage;
        // When editing (editId in URL), keep data ephemeral in sessionStorage
        return window.location.search.includes("editId")
          ? sessionStorage
          : localStorage;
      }),
    }
  )
);
