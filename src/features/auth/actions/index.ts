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
import type { SuccessResponseType } from "@/common/types/success-response.type";
import { getAccessToken } from "@/common/utils/get-access-token.util";
import { apiService } from "@/services/api";

const login = async (
  credentials: LoginCredentialsType,
): Promise<GenericResponseType<LoginResponseType>> => {
  const response = await apiService<LoginResponseType>("/auth/login", {
    method: "POST",
    body: credentials,
  });

  if (response.status === "error") {
    return response;
  }

  const cookieStore = await cookies();
  cookieStore.set("accessToken", response.data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 15 * 60,
  });

  return {
    status: "success",
    data: response.data,
  };
};

const register = async (
  credentials: RegisterCredentialsType,
): Promise<GenericResponseType<RegisterResponseType>> => {
  const response = await apiService<RegisterResponseType>("/auth/register", {
    method: "POST",
    body: credentials,
  });

  if (response.status === "error") {
    return response;
  }

  return {
    status: "success",
    data: response.data,
  };
};

const logout = async (): Promise<GenericResponseType<SuccessResponseType>> => {
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

const removeAccount = async (
  userId: number,
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

const getCurrentUser = async (): Promise<AuthContextValueType["user"]> => {
  try {
    const token = await getAccessToken();

    if (!token) {
      return null;
    }

    const response = await apiService<AuthContextValueType["user"]>(
      "/users/me",
      {
        method: "GET",
        withAuth: true,
      },
    );

    if (response.status === "error" || response.data === null) {
      return null;
    }

    return response.data;
  } catch {
    return null;
  }
};

export { login, register, logout, removeAccount, getCurrentUser };
