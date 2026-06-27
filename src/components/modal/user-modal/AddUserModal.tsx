"use client"
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect, useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import { AddUserFormInputs, UserRole, UsersTypes } from "@Types/userStore";
import axios from "axios";
import toast from "react-hot-toast";
import { BaseModal } from "../BaseModal";

interface AddUsersModalProps {
    onClose?: () => void;
    method: "add" | "edit";
    user: Partial<Pick<UsersTypes, "Fullname" | "_id" | "email" | "password" | "Birthdate" | "roles">> | null;
}

const roleMap: Record<UserRole, number> = {
    Admin: 5150,
    Moderator: 1984,
    User: 2001
};

export default function AddUserModal({ onClose, method, user }: AddUsersModalProps) {
    const [showPass, setShowPass] = useState(false);
    const queryClient = useQueryClient();

    const availableRoles: UserRole[] = ["Admin", "Moderator", "User"];

    const { register, handleSubmit, control, reset } = useForm<AddUserFormInputs>({
        defaultValues: {
            role: ["User"]
        }
    });

    useEffect(() => {
        if (method === "edit" && user) {
            let birthdateValue: DateObject | null = null;
            if (user.Birthdate) {
                if (typeof user.Birthdate === "string") {
                    birthdateValue = new DateObject({ date: user.Birthdate, calendar: persian });
                } else {
                    birthdateValue = user.Birthdate;
                }
            }

            const userRoles: UserRole[] = user.roles
                ? (Object.keys(user.roles).filter(key => {
                    const roleKey = key as UserRole;
                    return user.roles![roleKey] !== undefined && user.roles![roleKey] !== null;
                }) as UserRole[])
                : ["User"];

            reset({
                _id: user._id ?? "",
                Fullname: user.Fullname ?? "",
                email: user.email ?? "",
                password: user.password ?? "",
                Birthdate: birthdateValue,
                role: userRoles
            });
        } else if (method === "add") {
            reset({
                Fullname: "",
                email: "",
                password: "",
                Birthdate: null,
                role: ["User"]
            });
        }
    }, [method, user, reset])

    const { mutateAsync, isPending } = useApiMutation({
        method: method === "add" ? "post" : "put",
        key: "addUser",
        url: method === "add" ? "/api/Auth/account/Register" : "/api/user/updateuser",
        useNextAPI: true,
        onSuccessCallback: () => {
            onClose?.();
            toast.success(method === "add" ? "کاربر با موفقیت ثبت نام شد" : "کاربر با موفقیت آپدیت شد", { style: { color: "#fff" } })
            queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        },
        onErrorCallback: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    toast.error("اطلاعات کافی نمیباشد !")
                } else if (error.response?.status === 409) {
                    toast.error("این کاربر از قبل وجود دارد")
                } else if (error.response?.status === 500) {
                    toast.error("خطای داخلی سرور")
                }
            }
        }
    });

    const SubmitUser = (data: AddUserFormInputs) => {
        const rolesObject = Object.fromEntries(
            data.role.map(role => [role, roleMap[role]])
        );

        const payload = {
            _id: user?._id,
            Fullname: data.Fullname,
            email: data.email,
            password: data.password,
            Birthdate: data.Birthdate?.format?.("YYYY/MM/DD"),
            roles: rolesObject,
        };

        try {
            mutateAsync(payload);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <BaseModal onClose={onClose} scrollable>
            <form onSubmit={handleSubmit(SubmitUser)} className="w-full text-white">
                <BaseModal.Header
                    title={method === "add" ? "افزودن کاربر جدید" : "ویرایش کاربر"}
                    className={method === "add" ? "[&_h2]:text-emerald-300" : "[&_h2]:text-blue-300"}
                />

                <BaseModal.Body>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-white/60">نام کاربری</label>
                            <input
                                {...register("Fullname")}
                                type="text"
                                placeholder="مثلاً: رضا محمدی"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/60 transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-white/60">ایمیل</label>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="example@gmail.com"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/60 transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1 sm:col-span-2">
                            <label className="text-sm text-white/60">رمز عبور</label>
                            <div className="w-full relative space-y-2">
                                <input
                                    disabled={method === "edit"}
                                    {...register("password")}
                                    type={showPass ? "text" : "password"}
                                    placeholder="حداقل 8 کاراکتر"
                                    className={`bg-white/5 border w-full border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/60 transition-all ${method === "edit" && "opacity-40"}`}
                                />
                                {method === "add" && (
                                    <span
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? <FiEyeOff /> : <FiEye />}
                                    </span>
                                )}
                                {method === "edit" && (
                                    <small className="text-red-400/80">رمز عبور قابل ویرایش نمیباشد</small>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 sm:col-span-2">
                            <label className="text-sm text-white/60">تاریخ تولد</label>
                            <Controller
                                control={control}
                                name="Birthdate"
                                render={({ field }) => (
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        inputClass="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-blue-500/60 transition-all text-white"
                                        placeholder="مثال: 1402/05/15"
                                        value={field.value || null}
                                        onChange={(date) => field.onChange(date)}
                                        format="YYYY/MM/DD"
                                    />
                                )}
                            />
                        </div>

                        <div className="flex flex-col gap-2 sm:col-span-2">
                            <label className="text-sm text-white/60">نقش کاربر</label>
                            <div className="flex flex-wrap gap-6">
                                {availableRoles.map((r) => (
                                    <label key={r} className="flex items-center gap-2 cursor-pointer text-white/80">
                                        <input
                                            type="checkbox"
                                            value={r}
                                            {...register("role", {
                                                validate: v => v.length > 0 || "حداقل یک نقش انتخاب کنید"
                                            })}
                                            className="accent-blue-500"
                                        />
                                        {r === "Admin" && "ادمین"}
                                        {r === "Moderator" && "ادیتور"}
                                        {r === "User" && "کاربر"}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </BaseModal.Body>

                <BaseModal.Footer className="border-t-0 pt-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition-all active:scale-95"
                    >
                        لغو
                    </button>

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`px-5 py-2 rounded-xl cursor-pointer ${isPending ? "bg-gray-400" : "bg-blue-600"} ${isPending ? "hover:bg-none" : "hover:bg-blue-700"} transition-all text-white active:scale-95`}
                    >
                        {isPending ? "..." : method === "add" ? "افزودن کاربر" : "آپدیت کاربر"}
                    </button>
                </BaseModal.Footer>
            </form>
        </BaseModal>
    );
}
