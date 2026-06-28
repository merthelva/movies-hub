"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { useRouter } from "@/i18n/navigation";
import {
  getCurrentUser,
  login,
  logout,
  register,
  removeAccount,
} from "@/features/auth/actions";
import type { AuthContextType } from "@/features/auth/types/context.type";
import type {
  LoginCredentialsType,
  RegisterCredentialsType,
} from "@/features/auth/types/actions.type";
import { TOKEN_REFRESH_INTERVAL_MS } from "@/features/auth/constants/token-refresh-interval.constant";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser ?? null);
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCurrentUser().then((currentUser) => {
        setUser(currentUser ?? null);
      });
    }, TOKEN_REFRESH_INTERVAL_MS);

    const controller = new AbortController();
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState !== "visible") {
          return;
        }

        getCurrentUser().then((currentUser) => {
          setUser(currentUser ?? null);
        });
      },
      { signal: controller.signal },
    );

    return () => {
      clearInterval(intervalId);
      controller.abort();
    };
  }, []);

  const handleRegister = async (credentials: RegisterCredentialsType) => {
    const response = await register(credentials);
    if (response.status === "error") {
      return;
    }

    setUser(response.data);
  };

  const handleLogin = async (credentials: LoginCredentialsType) => {
    const response = await login(credentials);
    if (response.status === "error") {
      return;
    }

    setUser({
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
    });
  };

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await logout();
    setIsLoading(false);
    if (response.status === "error") {
      return;
    }

    setUser(null);
    push("/");
  };

  const handleRemoveAccount = async (userId: number) => {
    const response = await removeAccount(userId);
    if (response.status === "error") {
      return;
    }

    setUser(null);
    push("/");
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    removeAccount: handleRemoveAccount,
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
