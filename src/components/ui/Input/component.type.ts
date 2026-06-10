import type { ComponentPropsWithoutRef } from "react";

type InputPropsType = ComponentPropsWithoutRef<"input"> & {
  label: string;
};

export type { InputPropsType };
