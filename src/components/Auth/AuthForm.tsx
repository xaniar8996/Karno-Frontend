"use client"
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthForm() {
    const [switchSide, setSwitchSide] = useState(false);

    return (
        <div className="w-full flex flex-row justify-center items-center">
            {switchSide ? (
                <LoginForm setSwitchSide={setSwitchSide} />

            ) : (
                <RegisterForm setSwitchSide={setSwitchSide}/>
            )}
        </div>
    )
}