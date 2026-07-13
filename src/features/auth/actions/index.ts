"use server";

import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import type {
  GetCurrentUserResponseType,
  LoginCredentialsType,
  LoginResponseType,
  RegisterCredentialsType,
  RegisterResponseType,
} from "@/features/auth/types/actions.type";
import { ACCESS_TOKEN_EXPIRY_SECONDS } from "@/features/auth/constants/access-token-expiry.constant";
import type { GenericResponseType } from "@/common/types/generic-response.type";
import { HttpStatusCodes } from "@/common/constants/http-status-codes.constant";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { SuccessResponseType } from "@/common/types/success-response.type";
import { getAccessToken } from "@/common/utils/get-access-token.util";
import type { LanguageType } from "@/common/types/language.type";
import { apiService } from "@/services/api";

const login = async (
  credentials: LoginCredentialsType,
  language?: LanguageType,
): Promise<GenericResponseType<LoginResponseType>> => {
  const response = await apiService<LoginResponseType>("/auth/login", {
    method: "POST",
    body: credentials,
    language,
  });

  if (response.status === "error") {
    return response;
  }

  const cookieStore = await cookies();
  cookieStore.set("accessToken", response.data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: ACCESS_TOKEN_EXPIRY_SECONDS,
  });

  return {
    status: "success",
    data: response.data,
  };
};

const register = async (
  credentials: RegisterCredentialsType,
  language?: LanguageType,
): Promise<GenericResponseType<RegisterResponseType>> => {
  const response = await apiService<RegisterResponseType>("/auth/register", {
    method: "POST",
    body: credentials,
    language,
  });

  if (response.status === "error") {
    return response;
  }

  return {
    status: "success",
    data: response.data,
  };
};

const logout = async (
  language?: LanguageType,
): Promise<GenericResponseType<SuccessResponseType>> => {
  const token = await getAccessToken();
  if (!token) {
    return {
      status: "error",
      code: HttpStatusCodes.UNAUTHORIZED,
      message: "User is not authenticated",
    };
  }

  const response = await apiService<SuccessResponseType>("/auth/logout", {
    method: "POST",
    withAuth: true,
    language,
  });

  if (response.status === "error") {
    return {
      ...response,
      message: serializeMessage("error", response.message),
    };
  }

  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  return {
    status: "success",
    data: response.data,
  };
};

const deleteAccount = async (
  userId: number,
  language?: LanguageType,
): Promise<GenericResponseType<SuccessResponseType>> => {
  const token = await getAccessToken();
  if (!token) {
    return {
      status: "error",
      code: HttpStatusCodes.UNAUTHORIZED,
      message: "User is not authenticated",
    };
  }

  const response = await apiService<SuccessResponseType>(
    `/auth/remove/${userId}`,
    {
      method: "DELETE",
      withAuth: true,
      language,
    },
  );

  if (response.status === "error") {
    return {
      ...response,
      message: serializeMessage("error", response.message),
    };
  }

  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  return response;
};

// TODO: add error.tsx under src/app/[locale]/ so an uncaught cookies()
// context-misuse error here renders a graceful fallback instead of the
// default Next.js error page.
const getCurrentUser = async (
  language?: LanguageType,
): Promise<GetCurrentUserResponseType> => {
  const token = await getAccessToken();
  const t = await getTranslations("Errors");

  if (!token) {
    return {
      ok: false,
      reason: "auth",
      message: t("unauthorized"),
    };
  }

  const response = await apiService<RegisterResponseType>("/users/me", {
    method: "GET",
    withAuth: true,
    language,
  });

  if (response.status === "error") {
    const isAuthError =
      response.code >= HttpStatusCodes.BAD_REQUEST &&
      response.code < HttpStatusCodes.INTERNAL_SERVER_ERROR;

    return {
      ok: false,
      reason: isAuthError ? "auth" : "network",
      message: isAuthError ? t("unauthorized") : t("networkError"),
    };
  }

  if (response.data === null) {
    return {
      ok: false,
      reason: "auth",
      message: t("unauthorized"),
    };
  }

  return {
    ok: true,
    user: response.data,
  };
};

export { login, register, logout, deleteAccount, getCurrentUser };
