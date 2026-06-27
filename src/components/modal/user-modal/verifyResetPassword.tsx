import { useState } from "react";
import { BaseModal } from "../BaseModal";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import toast from "react-hot-toast";
import OTPVerification from "@components/otp-veification/OtpVerification";
import { ResetPasswordValidation, ResetPasswordValidationType } from "@Types/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface VerifyResetPasswordProps {
    onClose?: () => void;
}

type EmailForm = {
    email: string
}

export default function verifyResetPassword({ onClose }: VerifyResetPasswordProps) {
    const [step, setStep] = useState<"email" | "otp" | "password">("email");
    const [email, setEmail] = useState("");

    const emailForm = useForm<EmailForm>();

    const passwordForm = useForm<ResetPasswordValidationType>({
        resolver: zodResolver(ResetPasswordValidation),
    });

    const SendResetOTP = useApiMutation({
        key: "reset-otp",
        url: "/api/Auth/otp/send-reset-otp",
        method: "post",
        useNextAPI: true,
        onSuccessCallback: () => {
            toast.success("رمز یکبار مصرف ارسال شد");
            setStep("otp");
        },

    });

    const ResetPasswordMutation = useApiMutation({
        key: "reset-password",
        url: "/api/Auth/otp/reset-password",
        method: "post",
        useNextAPI: true,
        onSuccessCallback: () => {
            toast.success("رمز عبور با موفقیت تغییر کرد");
            onClose?.();
        },
    });

    const HandleSendOTP = async (data: EmailForm) => {
        await SendResetOTP.mutateAsync(data);
        setEmail(data.email);
    }

    const HandleResetPassword = async (data: ResetPasswordValidationType) => {
        await ResetPasswordMutation.mutateAsync({
            email: email,
            newPassword: data.newPassword
        })
    }

    return ((
        <BaseModal open={true} onClose={onClose}>
            <BaseModal.Header
                className="[&_h2]:text-2xl p-1"
                title="تغییر رمز عبور"
                subtitle={step === "password" ? "رمز جدید خود را وارد کنید" : "اول ایمیل خودت رو وارد کن"}
            />
            <BaseModal.Body>
                <div className="flex flex-col gap-2">
                    {step === "otp" ? (
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
                                <p className="text-white/50 text-sm mb-2">ایمیل تایید شده</p>
                                <p className="text-white font-semibold text-lg break-all">{email}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <p className="text-white/50 text-xs mb-3 text-center">کد 6 رقمی را وارد کنید</p>
                                <OTPVerification
                                    verifyUrl="/api/Auth/otp/verify-reset-otp"
                                    successMessage="کد با موفقیت تایید شد"
                                    className="w-full p-3 bg-black rounded-xl text-white cursor-pointer hover:bg-gray-900 transition-all active:scale-95 font-semibold"
                                    onSuccess={() => {
                                        setStep("password")
                                    }}
                                    extraData={{
                                        email: email
                                    }}
                                />
                            </div>
                        </div>
                    ) : step === "password" ? (
                        <div className="space-y-4">
                            <form 
                            onSubmit={passwordForm.handleSubmit(HandleResetPassword)}
                            className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl space-y-3">
                                <p className="text-white/60 text-sm">
                                    رمز عبور جدید
                                </p>
                                <input
                                    type={"password"}
                                    {...passwordForm.register("newPassword")}
                                    placeholder="رمز جدید"
                                    className="
                                    w-full p-3.5 rounded-xl
                                    bg-black/20
                                    border border-white/10
                                    text-white placeholder-white/30
                                    outline-none
                                    focus:border-blue-500/50
                                    focus:shadow-lg focus:shadow-blue-500/10
                                    transition-all
                                    "
                                />
                                {(passwordForm.formState.errors.newPassword) && (
                                    <p className="text-red-400 text-xs">
                                        {
                                            passwordForm.formState.errors.newPassword?.message
                                        }
                                    </p>
                                )}
                                <input
                                    type={"password" }
                                    {...passwordForm.register("confirmPassword")}
                                    placeholder="تکرار رمز"
                                    className="
                                    w-full p-3.5 rounded-xl
                                    bg-black/20
                                    border border-white/10
                                    text-white placeholder-white/30
                                    outline-none
                                    focus:border-cyan-500/50
                                    focus:shadow-lg focus:shadow-cyan-500/10
                                    transition-all"
                                />
                                {(
                                    passwordForm.formState.errors.confirmPassword) && (
                                        <p className="text-red-400 text-xs">
                                            {
                                                passwordForm.formState.errors.confirmPassword?.message
                                            }
                                        </p>
                                    )}
                                <button
                                    type="submit"
                                    className="
                                    w-full py-3.5 rounded-xl
                                    bg-gradient-to-r from-blue-900 to-slate-950
                                    text-white cursor-pointer
                                    hover:scale-[1.02]
                                    active:scale-95
                                    shadow-lg shadow-blue-900/20
                                    transition-all"
                                >
                                    تغییر رمز
                                </button>
                            </form>
                        </div>
                    ) : (
                        <form
                            onSubmit={emailForm.handleSubmit(HandleSendOTP)}
                            className="flex flex-col gap-4"
                        >
                            <input
                                type="email"
                                {...emailForm.register("email", { required: true })}
                                placeholder="ایمیل خود را وارد کنید"
                                className="
                            w-full p-4 rounded-2xl
                            bg-white/5 backdrop-blur-xl
                            border border-white/10
                            text-white placeholder-white/30
                            outline-none
                            focus:border-blue-500/50
                            focus:shadow-lg focus:shadow-blue-500/20
                            transition-all"
                            />

                            <button
                                type="submit"
                                className="
                            p-4 rounded-2xl
                            bg-gradient-to-r from-blue-900 to-slate-950
                            shadow-blue-900/10 cursor-pointer
                            text-white font-semibold
                            hover:scale-[1.02]
                            active:scale-95
                            shadow-lg shadow-blue-500/10
                            transition-all"
                            >
                                ارسال کد ✨
                            </button>
                        </form>
                    )}
                </div>
            </BaseModal.Body>
        </BaseModal>
    ))
}