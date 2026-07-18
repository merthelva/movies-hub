"use server";

import { getLocale, getTranslations } from "next-intl/server";
import type { ZodType } from "zod";

import { login, register } from ".";

import {
  createLoginSchema,
  createRegisterSchema,
} from "@/features/auth/schemas";
import { Language } from "@/common/constants/language.constant";
import type { LocaleType } from "@/common/types/locale.type";
import type { TranslatorType } from "@/common/types/translator.type";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import { safeParseFormBody } from "@/features/auth/utils/safe-parse-form-body.util";
import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type {
  AuthServerActionCallbackType,
  LoginCredentialsType,
  RegisterCredentialsType,
} from "@/features/auth/types/actions.type";

const authFormActionFactory = <
  TFormFields extends Record<string, string>,
  TCredentials extends Record<string, string> = TFormFields,
>(
  createAuthSchema: (t: TranslatorType<"Auth">) => ZodType<TFormFields>,
  fields: Array<keyof TFormFields & string>,
  authServerAction: AuthServerActionCallbackType<TCredentials>,
  toCredentials: (formFields: TFormFields) => TCredentials = (formFields) =>
    formFields as unknown as TCredentials,
) => {
  return async (
    _prevState: FormActionStateType,
    formData: FormData,
  ): Promise<FormActionStateType<TFormFields>> => {
    const formFields = fields.reduce((acc, field) => {
      acc[field] = String(
        formData.get(field) ?? "",
      ) as TFormFields[typeof field];
      return acc;
    }, {} as TFormFields);

    const t = await getTranslations("Auth");
    const authSchema = createAuthSchema(t);
    const parsedAuthForm = safeParseFormBody(authSchema, formFields);

    if (parsedAuthForm.status === "error") {
      return {
        ...parsedAuthForm,
        formFields,
        errorFields: parsedAuthForm.path,
        message: parsedAuthForm.message.join("\n"),
      } as FormActionStateType<TFormFields>;
    }

    const locale = (await getLocale()) as LocaleType;
    const credentials = toCredentials(parsedAuthForm.data);

    const response = await authServerAction(credentials, Language[locale]);

    if (response.status === "error") {
      return {
        status: "error",
        formFields,
        message: serializeMessage("error", response.message),
      } as FormActionStateType<TFormFields>;
    }

    return { status: response.status };
  };
};

const loginFormAction = authFormActionFactory<LoginCredentialsType>(
  createLoginSchema,
  ["email", "password"],
  login,
);

const registerFormAction = authFormActionFactory<
  RegisterCredentialsType & { confirmPassword: string },
  RegisterCredentialsType
>(
  createRegisterSchema,
  ["name", "email", "password", "confirmPassword"],
  register,
  ({ confirmPassword: _confirmPassword, ...credentials }) => credentials,
);

export { loginFormAction, registerFormAction };
