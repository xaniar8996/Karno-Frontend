
export interface UsersTypes {
    Fullname: string;
    email: string;
    password: string;
    id?: string;
    _id?: string;
    roles:{
        User:number,
        Moderator: number,
        Admin: number,
    };
    verifyOtp:string,
    verifyOtpExpiredAt:number,
    isAccountVerified:boolean,
    resetOtp:string,
    resetOtpExpiredAt:string
}

export interface UserStoreTypes {
    Users: UsersTypes | null;
    GetUser: () => Promise<UsersTypes | null>;
}