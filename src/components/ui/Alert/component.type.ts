import type { StateVariantType } from "@/common/types/state-variant.type";
import type { ReactNode } from "react";

type AlertPropsType = {
  role?: "alert" | "status";
  variant: StateVariantType;
  content: string | ReactNode;
};

export type { AlertPropsType };
