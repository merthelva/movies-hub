import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type ButtonVariantType = "primary" | "secondary" | "ghost";
type ButtonSizeType = "sm" | "md" | "lg";

type ButtonPropsType = ComponentPropsWithoutRef<"button"> &
  PropsWithChildren & {
    variant?: ButtonVariantType;
    size?: ButtonSizeType;
  };

export type { ButtonVariantType, ButtonSizeType, ButtonPropsType };
