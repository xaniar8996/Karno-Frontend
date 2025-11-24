import { z } from "zod";

export const AuthValidation = z.object({
    Fullname: z.string(),
    email: z.string().email("ایمیل نامعتبر است !"),
    password: z.string().min(8, "رمز عبور باید حداقل 8 رقم باشد"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"],
})

export type AuthValidationType = z.infer<typeof AuthValidation>;