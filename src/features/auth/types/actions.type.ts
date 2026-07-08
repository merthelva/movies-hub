import type { GenericResponseType } from "@/common/types/generic-response.type";
import type { LanguageType } from "@/common/types/language.type";

type LoginCredentialsType = {
  email: string;
  password: string;
};

type RegisterCredentialsType = LoginCredentialsType & {
  name: string;
};

type RegisterResponseType = {
  id: number;
  email: string;
  name: string;
};

type LoginResponseType = RegisterResponseType & {
  accessToken: string;
};

type GetCurrentUserResponseType =
  | { ok: true; user: RegisterResponseType }
  | {
      ok: false;
      reason: "auth" | "network";
      message?: string;
    };

type AuthContextValueType = {
  user: RegisterResponseType | null;
  isLoading: boolean;
};

type AuthServerActionCallbackType<TCredentials> = (
  credentials: TCredentials,
  language?: LanguageType,
) => Promise<GenericResponseType<unknown>>;

export type {
  LoginCredentialsType,
  RegisterCredentialsType,
  LoginResponseType,
  RegisterResponseType,
  GetCurrentUserResponseType,
  AuthContextValueType,
  AuthServerActionCallbackType,
};
