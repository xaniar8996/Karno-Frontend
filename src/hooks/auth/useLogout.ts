import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import { clearAllTokens } from "@lib/auth";
import { useResumeStore } from "@Store/resumeStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// logout ...
export const useLogout = () => {
  const { reset } = useResumeStore();
  const router = useRouter();

  return useApiMutation({
    method: "post",
    url: "/api/Auth/account/Logout",
    useNextAPI: true,
    async onSuccessCallback() {
      await clearAllTokens();
      reset();
      router.replace("/Auth/login");
      toast.success("خروج از اکانت موفقیت آمیز بود", { style: { color: "#fff" } })
    },
  })
}