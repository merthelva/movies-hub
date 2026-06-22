"use server";

import { API_BASE_URL } from "@/common/constants/api-base-url.constant";
import { HttpStatusCodes } from "@/common/constants/http-status-codes.constant";
import type { GenericResponseType } from "@/common/types/generic-response.type";
import { getAccessToken } from "@/common/utils/get-access-token.util";
import type { ApiErrorDataType, FetchOptionsType } from "./api.type";

const apiService = async <TResponse>(
  endpoint: string,
  options: FetchOptionsType = {},
): Promise<GenericResponseType<TResponse>> => {
  const {
    body,
    method = "GET",
    withAuth = false,
    headers: extraHeaders,
    ...restOptions
  } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(extraHeaders as Record<string, string>),
  };

  if (withAuth) {
    const token = await getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...restOptions,
      method,
      headers,
      ...(body != null ? { body: JSON.stringify(body) } : {}),
    });

    // Handle cases where the response has no content (e.g., 204 No Content)
    // parser gets empty string, throws SyntaxError: Unexpected end of JSON input.
    const data: unknown =
      response.status !== 204 ? await response.json() : null;

    if (!response.ok || (data as ApiErrorDataType)?.status === "error") {
      const errorData = data as ApiErrorDataType;
      return {
        status: "error",
        code: errorData?.code ?? response.status,
        message:
          errorData?.message ??
          "An unexpected error occurred. Please try again later.",
      };
    }

    return { status: "success", data: data as TResponse };
  } catch {
    return {
      status: "error",
      code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};

export { apiService };
