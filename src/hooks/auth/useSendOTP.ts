  // send OTP ...

import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";

  export const useSendOTP = () => {
    return useApiMutation({
        method:"post",
        url: "/api/Auth/otp/sendOtp",
        successMessage: "کد تایید به ایمیل شما ارسال شد",
        useNextAPI: true
    })
  }