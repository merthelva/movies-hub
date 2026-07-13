"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { useLocale } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { getCurrentUser, logout, deleteAccount } from "@/features/auth/actions";
import type { AuthContextType } from "@/features/auth/types/context.type";
import { TOKEN_REFRESH_INTERVAL_MS } from "@/features/auth/constants/token-refresh-interval.constant";
import { Language } from "@/common/constants/language.constant";
import type { LocaleType } from "@/common/types/locale.type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();
  const locale = useLocale() as LocaleType;
  const language = Language[locale];

  useEffect(() => {
    const initializeAuth = async () => {
      const response = await getCurrentUser(language);
      setUser(response.ok ? response.user : null);
      setIsLoading(false);
    };

    initializeAuth();
  }, [language]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCurrentUser(language).then((response) => {
        setUser(response.ok ? response.user : null);
      });
    }, TOKEN_REFRESH_INTERVAL_MS);

    const controller = new AbortController();
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState !== "visible") {
          return;
        }

        getCurrentUser(language).then((response) => {
          setUser(response.ok ? response.user : null);
        });
      },
      { signal: controller.signal },
    );

    return () => {
      clearInterval(intervalId);
      controller.abort();
    };
  }, [language]);

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await logout(language);
    setIsLoading(false);
    if (response.status === "success") {
      setUser(null);
      push("/");
    }
  };

  const handleDeleteAccount = async (userId: number) => {
    const response = await deleteAccount(userId, language);
    if (response.status === "success") {
      setUser(null);
      push("/");
    }
    return response;
  };

  const handleRefreshUser = async () => {
    const response = await getCurrentUser(language);
    setUser(response.ok ? response.user : null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    logout: handleLogout,
    deleteAccount: handleDeleteAccount,
    refreshUser: handleRefreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
export type { AuthContextType };
