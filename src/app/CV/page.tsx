import MainForm from "@components/CV/MainForm";
import ResumeTemplate from "@components/CV/Template";

export default function page(){
    return(
        <div className="w-full flex flex-row-reverse justify-center items-center gap-10">
            <ResumeTemplate/>
            <MainForm/>
        </div>
    )
}
