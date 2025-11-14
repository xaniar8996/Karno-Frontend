
import { BaseAPI } from "@lib/axios";
import { create } from "zustand";
import { UserStoreTypes } from "@Schemas/UserStore";

const UserStore = create<UserStoreTypes>((set) => ({
    Users: null,
    GetUser: async () => {
        try {
            const response = await BaseAPI.get("/users/single-user");
            set({ Users: response?.data?.data })
            return response?.data?.data ?? null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}))

export default UserStore