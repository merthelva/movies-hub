"use server";

import { getLocale, getTranslations } from "next-intl/server";

import { createUpdateProfileSchema } from "@/features/profile/schemas";
import { updateProfile } from "@/features/profile/services";
import type { initialReadOnlyFormFields } from "@/features/profile/constants/initial-read-only-form-fields.constant";
import { safeParseFormBody } from "@/common/utils/safe-parse-form-body.util";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type { ProfileUpdateBodyType } from "@/features/profile/types/actions.type";
import { Language } from "@/common/constants/language.constant";
import type { LocaleType } from "@/common/types/locale.type";
import type { UpdateProfilePayloadType } from "../types/update-profile-payload.type";
import { getCurrentUser } from "@/features/auth/actions";

const updateProfileFormAction = async (
  userId: number,
  readOnlyFormFields: typeof initialReadOnlyFormFields,
  _prevState: FormActionStateType<ProfileUpdateBodyType>,
  formData: FormData,
): Promise<FormActionStateType<ProfileUpdateBodyType>> => {
  const formFields: ProfileUpdateBodyType = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    currentPassword: String(formData.get("currentPassword") ?? ""),
    newPassword: String(formData.get("newPassword") ?? ""),
  };

  const t = await getTranslations("Profile");
  const updateProfileSchema = createUpdateProfileSchema(t, readOnlyFormFields);

  const parsedProfileUpdateForm = safeParseFormBody(updateProfileSchema, {
    ...formFields,
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  });

  if (parsedProfileUpdateForm.status === "error") {
    return {
      status: "error",
      formFields,
      errorFields: parsedProfileUpdateForm.path,
      message: parsedProfileUpdateForm.message.join("\n"),
    };
  }

  const { name, email, currentPassword, newPassword } =
    parsedProfileUpdateForm.data;

  const currentUserResponse = await getCurrentUser();
  if (!currentUserResponse.ok) {
    return {
      status: "error",
      formFields,
      message: "User is not authenticated or token expired", // TODO: Add translation
    };
  }

  const locale = (await getLocale()) as LocaleType;

  // The service does not expect a field with empty string value. If a field has so,
  // it should rather not be sent to the service within request payload/body at all.
  const payload: UpdateProfilePayloadType = {
    currentPassword,
  };
  if (
    !readOnlyFormFields.name &&
    name &&
    name.trim().length >= 2 &&
    name.trim().length <= 50 // comply with form validation restriction
  ) {
    payload.name = name;
  }
  if (!readOnlyFormFields.email && email && email.trim().length > 0) {
    payload.email = email; // `email` is normalized in service code. So, no need for redundant effort here.
  }
  if (!readOnlyFormFields.newPassword) {
    payload.newPassword = newPassword;
  }

  const response = await updateProfile(userId, payload, Language[locale]);

  if (response.status === "error") {
    return {
      status: "error",
      formFields,
      message: serializeMessage("error", response.message),
    };
  }

  return { status: "success", message: response.data.message };
};

export { updateProfileFormAction };
