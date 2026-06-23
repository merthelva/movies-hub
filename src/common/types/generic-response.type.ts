import type { ObjectValuesType } from "./object-values.type";

import { HttpStatusCodes } from "@/common/constants/http-status-codes.constant";

type GenericResponseType<TData = undefined> =
  | {
      status: "error";
      code: ObjectValuesType<typeof HttpStatusCodes>;
      message: string | Array<string>;
    }
  | {
      status: "success";
      data: TData;
    };

export type { GenericResponseType };
