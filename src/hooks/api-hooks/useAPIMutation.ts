import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BaseAPI, NextAPI } from "@lib/axios";
import type { AxiosInstance } from "axios";

interface MutationTypes {
    url: string;
    key?: String;
    successMessage?: string;
    onSuccessCallback?: (res: any) => void | Promise<void>;
    onErrorCallback?: (error: any) => void;
    client?: AxiosInstance; // override API client (defaults to BaseAPI)
    useNextAPI?: boolean;   // shortcut: true -> NextAPI
    method: "post" | "delete" | "put" | "patch"
}

export const useApiMutation = <TVariables = any, TResponse = any>({
    url,
    successMessage,
    key,
    onSuccessCallback,
    onErrorCallback,
    client,
    useNextAPI,
    method
}: MutationTypes) => {
    const apiClient = (useNextAPI ? NextAPI : undefined) || client || BaseAPI;

    return useMutation<TResponse, any, TVariables>({
        mutationKey: [`${key}`],
        mutationFn: (body?: any) => {
            switch (method) {
                case "post":
                    return apiClient.post(url, body);

                case "put":
                    return apiClient.put(url, body);

                case "delete":
                    return apiClient.delete(url, { data: body });

                case "patch":
                    return apiClient.patch(url, body);

                default:
                    throw new Error("Invalid method");
            }
        },

        onSuccess: (res: any) => {
            if (res?.status === 200 || res?.status === 201) {
                successMessage && toast.success(successMessage, { style: { color: '#000' } });
                onSuccessCallback?.(res);
            }
        },

        onError: (error) => {
            if (onErrorCallback) {
                onErrorCallback(error);
                return;
            }

            console.log(error);

            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 400) toast.error("درخواست نامعتبر است");
                else if (status === 404) toast.error("یافت نشد");
                else toast.error("خطای داخلی سرور");
            } else {
                toast.error("خطای ناشناخته");
            }
        },
    });
};
