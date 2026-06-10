"use server";

import type {
  ListCreateBodyType,
  ListCreateResponseType,
} from "@/features/user-lists/types/actions.type";
import type { GenericResponseType } from "@/common/types/generic-response.type";
import { HttpStatusCodes } from "@/common/constants/http-status-codes.constant";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import { API_BASE_URL } from "@/common/constants/api-base-url.constant";
import { getCurrentUser } from "@/features/auth/actions";
import { getCookieStoreAndAccessToken } from "@/common/utils/get-cookie-store-and-access-token.util";
import type { UserListType } from "@/features/user-lists/types/user-list.type";

const createList = async (
  body: ListCreateBodyType,
  userListType: UserListType,
): Promise<GenericResponseType<ListCreateResponseType>> => {
  const [currentUser, [, token]] = await Promise.all([
    getCurrentUser(),
    getCookieStoreAndAccessToken(),
  ]);

  if (currentUser == null || !token) {
    return {
      status: "error",
      code: HttpStatusCodes.UNAUTHORIZED,
      message: "User is not authenticated",
    };
  }

  const response = await fetch(`${API_BASE_URL}/${userListType}/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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

export { createList };
