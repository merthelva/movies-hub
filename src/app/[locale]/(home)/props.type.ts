import type { PropsWithChildren, ReactNode } from "react";

type HomeLayoutPropsType = PropsWithChildren & {
  popular: ReactNode;
  nowPlaying: ReactNode;
  topRated: ReactNode;
  upcoming: ReactNode;
};

export type { HomeLayoutPropsType };
