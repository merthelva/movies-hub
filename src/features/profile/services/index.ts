"use server";
import { revalidatePath } from "next/cache";

import { apiService } from "@/services/api";
import type { UpdateProfilePayloadType } from "@/features/profile/types/update-profile-payload.type";
import type { SuccessResponseType } from "@/common/types/success-response.type";
import type { LanguageType } from "@/common/types/language.type";

const updateProfile = async (
  userId: number,
  body: UpdateProfilePayloadType,
  language?: LanguageType,
) => {
  const response = await apiService<SuccessResponseType>(`/users/${userId}`, {
    method: "PATCH",
    withAuth: true,
    body,
    language,
  });

  if (response.status === "success") {
    revalidatePath("/[locale]/user/profile", "page");
  }

  return response;
};

export { updateProfile };
