import type { HomeLayoutPropsType } from "./props.type";
import styles from "./styles.module.scss";

export default function HomeLayout({
  children,
  popular,
  nowPlaying,
  topRated,
  upcoming,
}: HomeLayoutPropsType) {
  return (
    <div className={styles.page}>
      {children}
      {popular}
      {nowPlaying}
      {topRated}
      {upcoming}
    </div>
  );
}
