import { create } from "zustand";
import { UserStoreTypes } from "@Types/UserStore";
import axios from "axios";

const UserStore = create<UserStoreTypes>((set) => ({
    Users: null,
    GetUser: async () => {
        try {
            const response = await axios.get("/api/user");
            set({ Users: response?.data })
            return response?.data ?? null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    GetAllUsers: async () => {
        try {
            const response = await axios.get("/api/user?all=true");
            set({ Users: response?.data })
            return response?.data ?? null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}))

export default UserStore