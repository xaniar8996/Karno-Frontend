import { NextAPI } from "@lib/axios";
import { useQuery, UseQueryResult, QueryKey } from "@tanstack/react-query";

interface QueryTypes<T = unknown> {
    key: QueryKey;
    url?: string;
    queryFn?: () => Promise<T>;
    enabled?: boolean;
}

export const useAPIQuery = <T = unknown>({
    key,
    url,
    queryFn,
    enabled = true,
}: QueryTypes<T>): UseQueryResult<T> => {
    const queryKey = Array.isArray(key) ? key : [key];

    const finalQueryFn =
        queryFn ||
        (async () => {
            if (!url) {
                throw new Error("useAPIQuery requires either a url or queryFn");
            }
            const res = await NextAPI.get<T>(url);
            return res.data;
        });

    return useQuery<T>({
        queryKey,
        queryFn: finalQueryFn,
        enabled,
    });
};