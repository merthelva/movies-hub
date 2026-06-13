import type { PropsWithChildren, ReactNode } from "react";

type MovieDetailsLayoutPropsType = PropsWithChildren & {
  details: ReactNode;
  cast: ReactNode;
  trailer: ReactNode;
};

export type { MovieDetailsLayoutPropsType };
