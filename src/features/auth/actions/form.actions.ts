"use server";

import { getLocale } from "next-intl/server";

import { login, register } from ".";

import { loginSchema, registerSchema } from "@/features/auth/schemas";
import { Language } from "@/common/constants/language.constant";
import type { LocaleType } from "@/common/types/locale.type";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import { safeParseFormBody } from "@/features/auth/utils/safe-parse-form-body.util";
import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type {
  LoginCredentialsType,
  RegisterCredentialsType,
} from "@/features/auth/types/actions.type";

const loginFormAction = async (
  _prevState: FormActionStateType,
  formData: FormData,
): Promise<FormActionStateType<LoginCredentialsType>> => {
  const parsedLoginForm = safeParseFormBody(loginSchema, {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (parsedLoginForm.status === "error") {
    return {
      ...parsedLoginForm,
      formFields: {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      },
    };
  }

  const locale = (await getLocale()) as LocaleType;
  const response = await login(parsedLoginForm.data, Language[locale]);
  if (response.status === "error") {
    return {
      status: "error",
      formFields: {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      },
      message: serializeMessage("error", response.message),
    };
  }

  return { status: response.status };
};

const registerFormAction = async (
  _prevState: FormActionStateType,
  formData: FormData,
): Promise<FormActionStateType<RegisterCredentialsType>> => {
  const parsedRegisterForm = safeParseFormBody(registerSchema, {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (parsedRegisterForm.status === "error") {
    return {
      ...parsedRegisterForm,
      formFields: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      },
    };
  }

  const locale = (await getLocale()) as LocaleType;
  const response = await register(parsedRegisterForm.data, Language[locale]);
  if (response.status === "error") {
    return {
      status: "error",
      formFields: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      },
      message: serializeMessage("error", response.message),
    };
  }

  return { status: response.status };
};

export { loginFormAction, registerFormAction };
