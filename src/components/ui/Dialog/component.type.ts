import type {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  RefObject,
} from "react";

type DialogPropsType = ComponentPropsWithoutRef<"dialog"> &
  PropsWithChildren<{
    ref?: RefObject<HTMLDialogElement | null>;
    isOpen: boolean;
    onClose: VoidFunction;
    title?: string;
    isDismissible?: boolean;
  }>;

export type { DialogPropsType };
