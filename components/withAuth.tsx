"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const { isAuthenticated } = useAuthStore((state) => ({
      isAuthenticated: state.isAuthenticated,
    }));

    useEffect(() => {
      if (!isAuthenticated) {
        redirect("/login");
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
