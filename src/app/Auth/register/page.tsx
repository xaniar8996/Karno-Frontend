import RegisterForm from "@components/Auth/RegisterForm";
import { Dispatch, SetStateAction } from "react";

interface SwitchSideProps {
    setSwitchSide: Dispatch<SetStateAction<boolean>>
}

export default function page({ setSwitchSide }: SwitchSideProps) {
    return (
        <RegisterForm setSwitchSide={setSwitchSide}/>
    )
}