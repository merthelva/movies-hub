import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { StateVariantType } from "@/common/types/state-variant.type";

type MessagePropsType = ComponentPropsWithoutRef<"span"> & {
  variant: StateVariantType;
  content: string | ReactNode;
  renderAs?: "span" | "p";
};

export type { MessagePropsType };
