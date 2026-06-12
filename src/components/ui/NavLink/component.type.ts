import type { PropsWithChildren } from "react";

type NavLinkPropsType = PropsWithChildren & {
  className?: string;
  href: string;
  label?: string;
  onClick?: VoidFunction;
};

export type { NavLinkPropsType };
