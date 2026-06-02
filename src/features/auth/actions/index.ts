"use server";

import { cookies } from "next/headers";

import type {
  AuthContextValueType,
  LoginCredentialsType,
  LoginResponseType,
  RegisterCredentialsType,
  RegisterResponseType,
} from "@/features/auth/types/actions.type";
import { ApiError } from "@/common/classes/api-error.class";
import type { GenericResponseType } from "@/common/types/generic-response.type";
import { HttpStatusCodes } from "@/common/constants/http-status-codes.constant";
import { serializeErrorMessage } from "@/common/utils/serialize-error-message.util";
import { API_BASE_URL } from "@/common/constants/api-base-url.constant";
import type { SuccessResponseType } from "@/common/types/success-response.type";

const getCookieAccessToken = async (): Promise<
  [Awaited<ReturnType<typeof cookies>>, string | null]
> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || null;
  return [cookieStore, token];
};

const login = async (
  credentials: LoginCredentialsType,
): Promise<LoginResponseType> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const jsonResp =
      (await response.json()) as GenericResponseType<LoginResponseType>;

    if ("error" in jsonResp) {
      throw new ApiError(
        jsonResp.statusCode,
        serializeErrorMessage(jsonResp.message),
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("accessToken", jsonResp.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 15 * 60,
    });

    return jsonResp;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      // Re-throw custom ApiError so UI can capture both error.status and error.message
      throw error;
    }

    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      error instanceof Error
        ? error.message
        : "An error occurred while logging the user in",
    );
  }
};

const register = async (
  credentials: RegisterCredentialsType,
): Promise<RegisterResponseType> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const jsonResp =
      (await response.json()) as GenericResponseType<RegisterResponseType>;

    if ("error" in jsonResp) {
      throw new ApiError(
        jsonResp.statusCode,
        serializeErrorMessage(jsonResp.message),
      );
    }

    return jsonResp;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      // Re-throw custom ApiError so UI can capture both error.status and error.message
      throw error;
    }

    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      error instanceof Error
        ? error.message
        : "An error occurred while registering the user",
    );
  }
};

const logout = async (): Promise<SuccessResponseType> => {
  try {
    const [cookieStore, token] = await getCookieAccessToken();

    if (!token) {
      throw new ApiError(
        HttpStatusCodes.UNAUTHORIZED,
        "User is not authenticated",
      );
    }

    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const jsonResp =
      (await response.json()) as GenericResponseType<SuccessResponseType>;

    if ("error" in jsonResp) {
      throw new ApiError(
        jsonResp.statusCode,
        serializeErrorMessage(jsonResp.message),
      );
    }

    cookieStore.delete("accessToken");
    return jsonResp;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      // Re-throw custom ApiError so UI can capture both error.status and error.message
      throw error;
    }

    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      error instanceof Error
        ? error.message
        : "An error occurred while logging the user out",
    );
  }
};

const removeAccount = async (userId: number): Promise<SuccessResponseType> => {
  try {
    const [cookieStore, token] = await getCookieAccessToken();

    if (!token) {
      throw new ApiError(
        HttpStatusCodes.UNAUTHORIZED,
        "User is not authenticated",
      );
    }

    const response = await fetch(`${API_BASE_URL}/auth/remove/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResp =
      (await response.json()) as GenericResponseType<SuccessResponseType>;

    if ("error" in jsonResp) {
      throw new ApiError(
        jsonResp.statusCode,
        serializeErrorMessage(jsonResp.message),
      );
    }

    cookieStore.delete("accessToken");
    return jsonResp;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      // Re-throw custom ApiError so UI can capture both error.status and error.message
      throw error;
    }

    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      error instanceof Error
        ? error.message
        : "An error occurred while removing the user account",
    );
  }
};

const getCurrentUser = async (): Promise<AuthContextValueType["user"]> => {
  try {
    const [, token] = await getCookieAccessToken();

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
