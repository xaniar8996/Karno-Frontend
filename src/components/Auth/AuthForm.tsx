"use client"
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import LoginPage from "@app/Auth/login/page";
import Resgisterpage from "@app/Auth/register/page";

export default function AuthForm() {
    const [switchSide, setSwitchSide] = useState(false);

    return (
        <div className="w-full flex flex-row justify-center items-center">
            {switchSide ? (
                <LoginPage setSwitchSide={setSwitchSide} />

            ) : (
                <Resgisterpage setSwitchSide={setSwitchSide}/>
            )}
        </div>
    )
}