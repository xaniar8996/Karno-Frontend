import LoginForm from "@components/Auth/LoginForm";
import { Dispatch, SetStateAction } from "react";

interface SwitchSideProps {
    setSwitchSide: Dispatch<SetStateAction<boolean>>
}

export default function page({ setSwitchSide }: SwitchSideProps) {
    return (
        <LoginForm setSwitchSide={setSwitchSide}/>
    )
}