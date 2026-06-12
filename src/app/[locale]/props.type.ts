import type { ReactNode } from "react";

type LocaleLayoutPropsType = LayoutProps<"/[locale]"> & {
  modal: ReactNode;
};

export type { LocaleLayoutPropsType };
