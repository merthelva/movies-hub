import type { ComponentPropsWithoutRef } from "react";

import type { ComponentSizeType } from "@/common/types/component-size.type";

type InputPropsType = ComponentPropsWithoutRef<"input"> & {
  componentSize?: ComponentSizeType;
  hasError?: boolean;
  label?: string;
};

export type { InputPropsType };
