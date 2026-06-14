"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Decide whether to perform a full page reload after login/logout/register/removeAccount to re-validate server components and fetch user-specific data?

  useEffect(() => {
    const initializeAuth = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser != null) {
        setUser(currentUser);
      }

      setIsLoading(false);
    };

    initializeAuth();
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

    const { accessToken, ...user } = response.data;
    setUser(user);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await logout();
    setIsLoading(false);
    if (response.status === "error") {
      return;
    }

    setUser(null);
  };

  const handleRemoveAccount = async (userId: number) => {
    const response = await removeAccount(userId);
    if (response.status === "error") {
      return;
    }

    setUser(null);
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
