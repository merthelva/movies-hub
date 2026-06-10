"use server";

import { login, register } from ".";
import { loginSchema, registerSchema } from "@/features/auth/schemas";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import { safeParseFormBody } from "../utils/safe-parse-form-body.util";
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
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (parsedLoginForm.status === "error") {
    return {
      ...parsedLoginForm,
      formFields: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    };
  }

  const response = await login(parsedLoginForm.data);
  if (response.status === "error") {
    return {
      status: "error",
      formFields: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
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
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (parsedRegisterForm.status === "error") {
    return {
      ...parsedRegisterForm,
      formFields: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    };
  }

  const response = await register(parsedRegisterForm.data);
  if (response.status === "error") {
    return {
      status: "error",
      formFields: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
      message: serializeMessage("error", response.message),
    };
  }

  return { status: response.status };
};

export { loginFormAction, registerFormAction };
