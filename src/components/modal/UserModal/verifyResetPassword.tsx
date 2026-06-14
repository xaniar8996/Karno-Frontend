import { useState } from "react";
import { BaseModal } from "../BaseModal";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import toast from "react-hot-toast";
import OTPVerification from "@components/otp-veification/otpVerification";

interface VerifyResetPasswordProps {
    onClose?: () => void;
}

type ResetOTPprops = {
    email:string
}

export default function verifyResetPassword({ onClose }: VerifyResetPasswordProps) {
    const [step, setStep] = useState<"email" | "otp" | "password">("email");

    const { register, handleSubmit, watch } = useForm<ResetOTPprops>();
 
    const SendResetOTP = useApiMutation({
        key: "reset-otp",
        url: "/api/Auth/otp/send-reset-otp",
        method: "post",
        onSuccessCallback: () => {
            toast.success("رمز یکبار مصرف ارسال شد");
            setStep("otp");
        },
        
    });

    const HandleSendOTP = async (data:ResetOTPprops) => {
        await SendResetOTP.mutateAsync(data)
    }

    const emailValue = watch("email");

    return ((
        <BaseModal open={true} onClose={onClose}>
            <BaseModal.Header
                className="[&_h2]:text-2xl p-1"
                title="تغییر رمز عبور"
                subtitle="اول ایمیل خودت رو وارد کن"
            />
            <form onSubmit={handleSubmit(HandleSendOTP)}>
                <BaseModal.Body>
                    <div className="flex flex-col gap-2">
                        {step === "otp" ? (
                            <div>
                                <p>{emailValue}</p>
                                <OTPVerification
                                    verifyUrl="/api/Auth/otp/resetPassword"
                                    successMessage="کد با موفقیت تایید شد"
                                    className="p-3 bg-black rounded-xl text-white cursor-pointer hover:bg-gray-800 transition-all active:scale-95"
                                    onSuccess={() => {
                                        setStep("password")
                                    }}
                                    extraData={{
                                        email:emailValue
                                    }}
                                />
                            </div>
                        ) : step === "password" ? (
                            <div>
                                <span className="text-white">newpassword</span>
                            </div>
                        ) : (
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="ایمیل"
                                className="p-3 rounded-xl bg-white/10 text-white/55
                                border outline-none border-none transition-all duration-300 focus:shadow-xl focus:shadow-white/10" />
                        )}
                    </div>
                </BaseModal.Body>
                <BaseModal.Footer>
                    <button onClick={onClose} className="bg-white/10 text-white/55 px-4 py-2 rounded-xl cursor-pointer hover:bg-red-500/20 transition-all duration-300 hover:text-white active:scale-95" >انصراف</button>
                    <button type="submit" className="bg-green-500/10 text-white/55 px-4 py-2 rounded-xl cursor-pointer hover:bg-green-500/20 transition-all duration-300 hover:text-white active:scale-95">ثبت ایمیل</button>
                </BaseModal.Footer>
            </form>
        </BaseModal>
    ))
}