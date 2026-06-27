import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import { clearAllTokens } from "@lib/auth";
import { useResumeStore } from "@Store/resumeStore";
import { useRouter } from "next/navigation";

  // logout ...
  export const useLogout = () => { 
    const { reset } = useResumeStore();
    const router = useRouter();

    return useApiMutation({
        method: "post",
        url: "/api/Auth/account/Logout",
        successMessage: "خروج از اکانت موفقیت آمیز بود",
        useNextAPI: true,
        onSuccessCallback() {
          router.replace("/Auth/login");
          clearAllTokens();
          reset();
        },
      })
}