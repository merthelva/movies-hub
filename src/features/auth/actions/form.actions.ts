"use server";

import { getLocale } from "next-intl/server";
import type { ZodType } from "zod";

import { login, register } from ".";

import { loginSchema, registerSchema } from "@/features/auth/schemas";
import { Language } from "@/common/constants/language.constant";
import type { LocaleType } from "@/common/types/locale.type";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import { safeParseFormBody } from "@/features/auth/utils/safe-parse-form-body.util";
import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type {
  AuthServerActionCallbackType,
  LoginCredentialsType,
  RegisterCredentialsType,
} from "@/features/auth/types/actions.type";

const authFormActionFactory = <TCredentials extends Record<string, string>>(
  authSchema: ZodType<TCredentials>,
  fields: Array<keyof TCredentials & string>,
  authServerAction: AuthServerActionCallbackType<TCredentials>,
) => {
  return async (
    _prevState: FormActionStateType,
    formData: FormData,
  ): Promise<FormActionStateType<TCredentials>> => {
    const formFields = fields.reduce((acc, field) => {
      acc[field] = String(
        formData.get(field) ?? "",
      ) as TCredentials[typeof field];
      return acc;
    }, {} as TCredentials);

    const parsedAuthForm = safeParseFormBody(authSchema, formFields);

    if (parsedAuthForm.status === "error") {
      return {
        ...parsedAuthForm,
        formFields,
        message: parsedAuthForm.message.join("\n"),
      } as FormActionStateType<TCredentials>;
    }

    const locale = (await getLocale()) as LocaleType;
    const response = await authServerAction(
      parsedAuthForm.data,
      Language[locale],
    );

    if (response.status === "error") {
      return {
        status: "error",
        formFields,
        message: serializeMessage("error", response.message),
      } as FormActionStateType<TCredentials>;
    }

    return { status: response.status };
  };
};

const loginFormAction = authFormActionFactory<LoginCredentialsType>(
  loginSchema,
  ["email", "password"],
  login,
);

const registerFormAction = authFormActionFactory<RegisterCredentialsType>(
  registerSchema,
  ["name", "email", "password"],
  register,
);

export { loginFormAction, registerFormAction };
