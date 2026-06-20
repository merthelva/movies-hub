import type { ComponentPropsWithoutRef } from "react";
import type { OptionType } from "@/common/types/option.type";

type MultiSwitchPropsType = Omit<
  ComponentPropsWithoutRef<"div">,
  "onChange"
> & {
  options: Array<OptionType>;
  value: string;
  onChange: (value: string) => void;
};

export type { MultiSwitchPropsType };
