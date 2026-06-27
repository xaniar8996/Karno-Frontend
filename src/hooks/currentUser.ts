import UserStore from "@Store/UserStore";
import { useAPIQuery } from "./api-hooks/useAPIQuery";


export const useCurrentUser = () => {
    const getUser = UserStore((state) => state?.GetUser);

    return useAPIQuery({
        key: ["User"],
        queryFn: getUser,
    })
}