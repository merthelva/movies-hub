import type { GenericResponseType } from "@/common/types/generic-response.type";
import type { LanguageType } from "@/common/types/language.type";

type ApiErrorDataType = Extract<GenericResponseType, { status: "error" }>;

type FetchOptionsType = Omit<RequestInit, "body"> & {
  body?: Record<PropertyKey, unknown>;
  withAuth?: boolean;
  language?: LanguageType;
};

export type { ApiErrorDataType, FetchOptionsType };
