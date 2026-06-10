import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type DialogPropsType = ComponentPropsWithoutRef<"dialog"> &
  PropsWithChildren<{
    isOpen: boolean;
    onClose: VoidFunction;
    title?: string;
  }>;

export type { DialogPropsType };
