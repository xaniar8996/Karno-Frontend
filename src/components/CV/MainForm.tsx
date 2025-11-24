"use client";

import { useState } from "react";
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
import "swiper/css";
import InterestsInput from "./CVForm/interestsInput";

export default function MainForm() {
    const [activeSection, setActiveSection] = useState("personalInfo");

    const renderForm = {
        personalInfo: <PersonalInput />,
        skills: <SkillsInput />,
        education: <EducationInput />,
        experience: <ExperienceInput />,
        projects:<ProjectInput/>,
        socialLinks:<SocialLinksInput/>,
        certificates:<CertificateInput/>,
        languages:<LanguageInput/>,
        interests:<InterestsInput/>
    }[activeSection];

    return (
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
    );
}
