import type { HomeLayoutPropsType } from "./props.type";

export default function HomeLayout({
  children,
  popular,
  nowPlaying,
  topRated,
  upcoming,
}: HomeLayoutPropsType) {
  return (
    <>
      {children}
      {popular}
      {nowPlaying}
      {topRated}
      {upcoming}
    </>
  );
}
