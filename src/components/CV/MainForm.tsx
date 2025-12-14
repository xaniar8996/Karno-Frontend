"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import EducationInput from "./CVForm/EducationInput";
import ExperienceInput from "./CVForm/ExperienceInput";
import PersonalInput from "./CVForm/PersonalInput";
import SkillsInput from "./CVForm/SkillsInput";
import { CVTitles } from "@data/UserCVInfos";
import ProjectInput from "./CVForm/ProjectInput";
import SocialLinksInput from "./CVForm/SoicalLinksInput";
import CertificateInput from "./CVForm/certificateInput";
import LanguageInput from "./CVForm/LanguageInput";
import InterestsInput from "./CVForm/interestsInput";
import "swiper/css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResumeStore } from "@Store/resumeStore";
import { resumeStoreStorageKey } from "@Store/resumeStore";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { NextAPI } from "@lib/axios";

interface MainFormProps {
    templateRef: React.RefObject<HTMLDivElement | null>;
}

export default function MainForm({ templateRef }: MainFormProps) {
    const query = useQueryClient();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("personalInfo");
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const hasHydratedRef = useRef(false);
    const editId = searchParams.get("editId");
    const handlePrint = useReactToPrint({
        contentRef: templateRef,
        documentTitle: "resume",
    });

    const renderForm = () => {
        switch (activeSection) {
            case "personalInfo":
                return <PersonalInput onPhotoChange={setPhotoFile} />;
            case "skills":
                return <SkillsInput />;
            case "education":
                return <EducationInput />;
            case "experience":
                return <ExperienceInput />;
            case "projects":
                return <ProjectInput />;
            case "socialLinks":
                return <SocialLinksInput />;
            case "certificates":
                return <CertificateInput />;
            case "languages":
                return <LanguageInput />;
            case "interests":
                return <InterestsInput />;
            default:
                return null;
        }
    };

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
        hydrate,
        reset,
    } = useResumeStore();

    // Updates template from URL params when it changes
    useEffect(() => {
        const urlTemplate = searchParams.get("tpl");
        if (urlTemplate && urlTemplate !== template) {
            setTemplate(urlTemplate);
        }
    }, [searchParams, template, setTemplate]);

    // Clear session data when leaving edit mode/unmount
    useEffect(() => {
        const isEdit = Boolean(editId);
        return () => {
            if (isEdit) {
                reset();
                if (typeof window !== "undefined") {
                    window.localStorage.removeItem(resumeStoreStorageKey);
                }
            }
        };
    }, [editId, reset]);

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

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["CV"],
        mutationFn: async () => {
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
                template: template || searchParams.get("tpl") || "",
            };

            const formData = new FormData();
            formData.append("payload", JSON.stringify(CVData));
            if (photoFile) {
                formData.append("photo", photoFile);
            }

            const url = editId ? `/api/CV/updateCV/${editId}` : "/api/CV";
            const method = editId ? "put" : "post";

            const CVresponse = await NextAPI.request({
                url,
                method,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            return CVresponse.data;
        },
        onSuccess: (_, variables, context) => {
            const editId = searchParams.get("editId");
            toast.success(editId ? "رزومه شما به‌روزرسانی شد" : "رزومه شما با موفقیت ذخیره شد");
            query.invalidateQueries({ queryKey: ["CV"] });
            query.invalidateQueries({ queryKey: ["UserCV"] });
            router.push("/profile");
            reset();
            setPhotoFile(null);
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    toast.error("این رزومه قبلا ثبت شده !");
                } else if (error.response?.status === 404) {
                    toast.error("اطلاعات شخصی الزامی است !");
                } else {
                    toast.error("خطای داخلی سرور");
                }
            }
        }
    });

    const handleSave = async () => {
        if (!personal.fullName) {
            toast.error("لطفا نام خود را وارد کنید");
            return;
        }

        // Check if template is selected
        const currentTemplate = template || searchParams.get("tpl");
        if (!currentTemplate) {
            toast.error("لطفا ابتدا یک قالب انتخاب کنید");
            return;
        }

        await mutateAsync();
    };


    return (
        <div className="flex flex-col justify-start items-center gap-5 w-full h-auto">
            <div className="w-full h-auto bg-gray-200 rounded-3xl flex flex-col justify-start items-center p-4">
                {/* Swiper */}
                <Swiper slidesPerView={"auto"} spaceBetween={5} className="w-full mt-5">
                    {CVTitles.map((cv, idx) => (
                        <SwiperSlide key={idx} className="!w-auto px-2">
                            <h3
                                onClick={() => setActiveSection(cv.section)}
                                className={`
                                    px-6 py-2 rounded-2xl text-sm text-black whitespace-nowrap
                                    cursor-pointer font-medium
                                    transition-all duration-300
                                    border mb-4
                                    ${activeSection === cv.section
                                        ? "bg-white shadow-md scale-105 border-white"
                                        : "bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/40"}
                                `}
                            >
                                {cv.title}
                            </h3>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="w-full h-auto mt-6">
                    {renderForm()}
                </div>
            </div>
            <div className="w-10/12 h-auto flex flex-row justify-start items-center gap-5" >
                <button
                    onClick={handlePrint}
                    className={`w-full sm:w-1/2 h-auto ${isPending ? "bg-gray-400" : "bg-blue-900"} text-white rounded-2xl p-4 cursor-pointer hover:bg-blue-700 transition-all active:scale-95`}>
                    ذخیره به عنوان PDF
                </button>
                <button
                    onClick={handleSave}
                    disabled={isPending}
                    className={`w-full sm:w-1/2 h-auto ${isPending ? "bg-gray-400" : "bg-green-900"} text-white rounded-2xl p-4 cursor-pointer hover:bg-green-700 transition-all active:scale-95`}>
                    {isPending ? "در حال ذخیره..." : `${editId ? "ویرایش رزومه" : "ذخیره در اکانت"}`}
                </button>
            </div>
        </div>
    );
}
