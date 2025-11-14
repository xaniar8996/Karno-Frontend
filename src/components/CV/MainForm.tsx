import EducationInput from "./CVForm/EducationInput";
import ExperienceInput from "./CVForm/ExperienceInput";
import PersonalInput from "./CVForm/PersonalInput";
import SkillsInput from "./CVForm/SkillsInput";

export default function MainForm() {
    return (
        <div>
            <SkillsInput />
            <PersonalInput />
            <ExperienceInput/>
            <EducationInput/>
        </div>
    )
}