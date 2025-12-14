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
}

export const useApiMutation = ({
    url,
    successMessage,
    key,
    onSuccessCallback,
    onErrorCallback,
    client,
    useNextAPI,
}: MutationTypes) => {
    const apiClient = (useNextAPI ? NextAPI : undefined) || client || BaseAPI;

    return useMutation({
        mutationKey: [`${key}`],
        mutationFn: (body?: any) => apiClient.post(url, body),

        onSuccess: (res: any) => {
            if (res?.status === 200) {
                successMessage && toast.success(successMessage);
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
