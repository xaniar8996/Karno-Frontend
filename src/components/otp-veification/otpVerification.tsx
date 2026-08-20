"use client";

import { Button } from "@components/base/button";
import { NextAPI } from "@lib/axios";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";

interface OTPVerificationProps {
  verifyUrl: string;
  onSuccess?: (data?: unknown) => void;
  successMessage?: string;
  buttonText?: string;
  className?: string;
  extraData?: Record<string, any>;
}

export default function OTPVerification({
  verifyUrl,
  onSuccess,
  successMessage = "",
  buttonText = "تایید کد",
  className = "",
  extraData,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = async () => {
    const isComplete = otp.every((digit) => digit.trim().length === 1);

    if (!isComplete) {
      toast.error("کد کامل را وارد نمایید");
      return;
    }

    try {
      const response = await NextAPI.post(verifyUrl, {
        OTP: otp.join(""),
        ...extraData,
      });

      if (response.status === 200) {
        toast.success(successMessage);
        onSuccess?.(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            toast.error("اطلاعات کامل نیست");
            break;

          case 401:
            toast.error("کد نادرست است");
            break;

          case 404:
            toast.error("کاربر پیدا نشد");
            break;

          case 410:
            toast.error("کد منقضی شده");
            break;

          default:
            toast.error("خطای داخلی سرور");
        }
      }
    }
  };

  return (
    <div className={`flex flex-col justify-center items-center gap-6`}>
      <div className="flex flex-row-reverse justify-center items-center gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            dir="ltr"
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index]}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none bg-gray-100 focus:border-blue-500 focus:scale-110 transition-all"
          />
        ))}
      </div>

      <Button
        variant="contained"
        color="default"
        type="button"
        onClick={verifyOTP}
        className={`w-full transition-all ${className} hover:bg-gray-800`}
      >
        {buttonText}
      </Button>
    </div>
  );
}
