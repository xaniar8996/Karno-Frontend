"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserStore from "@Store/UserStore";

type Options = {
  redirectTo?: string;
};

export function useRequireVerifiedAccount(options: Options = {}) {
  const router = useRouter();
  const user = UserStore((state) => state?.Users);
  const redirectTo = options.redirectTo ?? "/Auth/error/UnverifiedEmail";

  useEffect(() => {
    if (!user) return;

    if (!user?.isAccountVerified) {
      router.replace(redirectTo);
    }
  }, [user, redirectTo, router]);
}


