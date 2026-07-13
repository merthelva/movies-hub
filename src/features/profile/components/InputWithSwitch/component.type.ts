import type { InputPropsType } from "@/components/ui/Input/component.type";
import type { MultiSwitchPropsType } from "@/components/ui/MultiSwitch/component.type";

type InputWithSwitchPropsType = InputPropsType & {
  shouldFieldUpdated: boolean;
  onSwitch: MultiSwitchPropsType["onChange"];
};

export type { InputWithSwitchPropsType };
