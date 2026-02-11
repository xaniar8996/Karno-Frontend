import { DateObject } from "react-multi-date-picker";

export interface UsersTypes {
    Fullname: string;
    email: string;
    password: string;
    id?: string;
    _id?: string;
    Birthdate: DateObject | null;
    roles: {
        User: number,
        Moderator: number,
        Admin: number,
    };
    verifyOtp: string,
    verifyOtpExpiredAt: number,
    isAccountVerified: boolean,
    resetOtp: string,
    resetOtpExpiredAt: string
}

export type UserRole = "Admin" | "Moderator" | "User";

export interface AddUserFormInputs {
    _id:string,
    Fullname: string;
    email: string;
    password: string;
    Birthdate: DateObject | null;
    role: UserRole[];
}

export interface UserStoreTypes {
    Users: UsersTypes | null;
    GetUser: () => Promise<UsersTypes | null>;
    GetAllUsers: () => Promise<UsersTypes | UsersTypes[] | null>;
}