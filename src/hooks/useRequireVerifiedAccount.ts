"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserStore from "@Store/UserStore";

type Options = {
  redirectTo?: string;
};

export function useRequireVerifiedAccount(options: Options = {}) {
  const router = useRouter();
  const User = UserStore((state) => state?.Users);
  const redirectTo = options.redirectTo ?? "/Auth/error/UnverifiedEmail";

  useEffect(() => {
    if (!User) return;

    if(User && User.isAccountVerified === false){
      router.replace("/Auth/error/UnverifiedEmail");
  }
  }, [User, redirectTo, router]);
}


