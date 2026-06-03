import type { GenericResponseType } from "@/common/types/generic-response.type";

type ApiErrorDataType = Extract<GenericResponseType, { status: "error" }>;

type FetchOptionsType = Omit<RequestInit, "body"> & {
  body?: Record<PropertyKey, unknown>;
  withAuth?: boolean;
};

export type { ApiErrorDataType, FetchOptionsType };
