"use client";
import { useState, useEffect } from "react";
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
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function MainForm() {
    const query = useQueryClient();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("personalInfo");

    const renderForm = {
        personalInfo: <PersonalInput />,
        skills: <SkillsInput />,
        education: <EducationInput />,
        experience: <ExperienceInput />,
        projects: <ProjectInput />,
        socialLinks: <SocialLinksInput />,
        certificates: <CertificateInput />,
        languages: <LanguageInput />,
        interests: <InterestsInput />
    }[activeSection];

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
        reset,
    } = useResumeStore();

    // Updates template from URL params when it changes
    useEffect(() => {
        const urlTemplate = searchParams.get("tpl");
        if (urlTemplate && urlTemplate !== template) {
            setTemplate(urlTemplate);
        }
    }, [searchParams, template, setTemplate]);

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

            const CVresponse = await axios.post("/api/CV", CVData);
            return CVresponse.data;
        },
        onSuccess: (data) => {
            toast.success("رزومه شما با موفقیت ذخیره شد");
            query.invalidateQueries({ queryKey: ["CV"] });
            router.push("/");
            reset();
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    toast.error("این رزومه قبلا ثبت شده !")
                } else if (error.response?.status === 404) {
                    toast.error("اطلاعات شخصی الزامی است !")
                }
                else {
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
                    {renderForm}
                </div>
            </div>
            <div className="w-10/12 h-auto flex flex-row justify-start items-center gap-5" >
            <button
                    // onClick={handleSave}
                    // disabled={isPending}
                    className={`w-full sm:w-1/2 h-auto ${isPending ? "bg-gray-400" : "bg-blue-900"} text-white rounded-2xl p-4 cursor-pointer hover:bg-blue-700 transition-all active:scale-95`}>
                    ذخیره به عنوان ...
                </button>
                <button
                    onClick={handleSave}
                    disabled={isPending}
                    className={`w-full sm:w-1/2 h-auto ${isPending ? "bg-gray-400" : "bg-green-900"} text-white rounded-2xl p-4 cursor-pointer hover:bg-green-700 transition-all active:scale-95`}>
                    {isPending ? "در حال ذخیره..." : "ذخیره در اکانت"}
                </button>
            </div>
        </div>
    );
}
