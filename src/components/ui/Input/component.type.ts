import type { ComponentPropsWithoutRef } from "react";

type InputPropsType = ComponentPropsWithoutRef<"input"> & {
  hasError?: boolean;
  label: string;
};

export type { InputPropsType };
