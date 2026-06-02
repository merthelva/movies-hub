import { HttpStatusCodes } from "@/common/constants/http-status-codes.constant";
import type { ObjectValuesType } from "./object-values.type";

type GenericResponseType<TData = undefined> =
  | {
      statusCode: ObjectValuesType<typeof HttpStatusCodes>;
      error: string;
      message: string | Array<string>;
    }
  | TData;

export type { GenericResponseType };
