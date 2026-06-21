import type { ComponentPropsWithoutRef, ReactNode } from "react";

type TabItemType = {
  id: string;
  label: string | ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

type TabListPropsType = Omit<ComponentPropsWithoutRef<"div">, "onChange"> & {
  tabs: Array<TabItemType>;
  activeTabId: string;
  onChange: (id: string) => void;
};

export type { TabItemType, TabListPropsType };
