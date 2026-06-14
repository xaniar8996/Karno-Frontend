import { create } from "zustand";
import { UserStoreTypes, UsersTypes } from "@Types/UserStore";
import { NextAPI } from "@lib/axios";

const UserStore = create<UserStoreTypes>((set) => ({
    Users: null,
    GetUser: async () => {
        try {
            const response = await NextAPI.get<UsersTypes>("/api/user");
            set({ Users: response?.data })
            return response?.data ?? null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    GetAllUsers: async () => {
        try {
            const response = await NextAPI.get("/api/user?all=true");
            set({ Users: response?.data })
            return response?.data ?? null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}))

export default UserStore