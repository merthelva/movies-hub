import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import type { ComponentSizeType } from "@/common/types/component-size.type";

type ButtonVariantType = "primary" | "secondary" | "ghost";

type ButtonPropsType = ComponentPropsWithoutRef<"button"> &
  PropsWithChildren & {
    variant?: ButtonVariantType;
    componentSize?: ComponentSizeType;
  };

export type { ButtonVariantType, ButtonPropsType };
