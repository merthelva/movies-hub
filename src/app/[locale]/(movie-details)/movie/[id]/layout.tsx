import type { MovieDetailsLayoutPropsType } from "./props.type";
import styles from "./styles.module.scss";

export default function MovieDetailsLayout({
  children,
  details,
  cast,
  trailer,
}: MovieDetailsLayoutPropsType) {
  return (
    <div className={styles.page}>
      {details}
      {trailer}
      {cast}
      {children}
    </div>
  );
}
