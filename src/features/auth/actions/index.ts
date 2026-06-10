"use server";

import { cookies } from "next/headers";

import type {
  AuthContextValueType,
  LoginCredentialsType,
  LoginResponseType,
  RegisterCredentialsType,
  RegisterResponseType,
} from "@/features/auth/types/actions.type";
import type { GenericResponseType } from "@/common/types/generic-response.type";
import { HttpStatusCodes } from "@/common/constants/http-status-codes.constant";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import { API_BASE_URL } from "@/common/constants/api-base-url.constant";
import type { SuccessResponseType } from "@/common/types/success-response.type";
import { getCookieStoreAndAccessToken } from "@/common/utils/get-cookie-store-and-access-token.util";

const login = async (
  credentials: LoginCredentialsType,
): Promise<GenericResponseType<LoginResponseType>> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const jsonResp = await response.json();
  if (jsonResp?.status === "error") {
    return {
      ...jsonResp,
      message: serializeMessage("error", jsonResp.message),
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("accessToken", jsonResp.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 15 * 60,
  });

  return {
    status: "success",
    data: jsonResp,
  };
};

const register = async (
  credentials: RegisterCredentialsType,
): Promise<GenericResponseType<RegisterResponseType>> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const jsonResp = await response.json();
  if (jsonResp?.status === "error") {
    return {
      ...jsonResp,
      message: serializeMessage("error", jsonResp.message),
    };
  }

  return {
    status: "success",
    data: jsonResp,
  };
};

const logout = async (): Promise<GenericResponseType<SuccessResponseType>> => {
  const [cookieStore, token] = await getCookieStoreAndAccessToken();
  if (!token) {
    return {
      status: "error",
      code: HttpStatusCodes.UNAUTHORIZED,
      message: "User is not authenticated",
    };
  }

  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const jsonResp = await response.json();
  if (jsonResp?.status === "error") {
    return {
      ...jsonResp,
      message: serializeMessage("error", jsonResp.message),
    };
  }

  cookieStore.delete("accessToken");
  return {
    status: "success",
    data: jsonResp,
  };
};

const removeAccount = async (
  userId: number,
): Promise<GenericResponseType<SuccessResponseType>> => {
  const [cookieStore, token] = await getCookieStoreAndAccessToken();
  if (!token) {
    return {
      status: "error",
      code: HttpStatusCodes.UNAUTHORIZED,
      message: "User is not authenticated",
    };
  }

  const response = await fetch(`${API_BASE_URL}/auth/remove/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResp = await response.json();
  if (jsonResp?.status === "error") {
    return {
      ...jsonResp,
      message: serializeMessage("error", jsonResp.message),
    };
  }

  cookieStore.delete("accessToken");
  return jsonResp;
};

const getCurrentUser = async (): Promise<AuthContextValueType["user"]> => {
  try {
    const [, token] = await getCookieStoreAndAccessToken();

    if (!token) {
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResp = (await response.json()) as AuthContextValueType["user"];
    return jsonResp;
  } catch (error: unknown) {
    return null;
  }
};

export { login, register, logout, removeAccount, getCurrentUser };
