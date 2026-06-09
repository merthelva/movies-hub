import styles from "./styles.module.scss";
import { joinClassNames } from "@/common/utils/join-classnames.util";

const MovieCardSkeleton = () => (
  <div className={styles.movieCard}>
    <div className={styles.poster} />
    <div className={styles.info}>
      <div className={styles.line} />
      <div className={joinClassNames(styles.line, styles.lineShort)} />
    </div>
  </div>
);

const MovieDetailsSkeleton = () => (
  <div className={styles.movieDetails}>
    <div className={styles.detailsPoster} />
    <div className={styles.detailsInfo}>
      <div className={joinClassNames(styles.line, styles.lineLong)} />
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={joinClassNames(styles.line, styles.lineShort)} />
      <div className={styles.detailsMeta}>
        <div className={styles.metaItem} />
        <div className={styles.metaItem} />
        <div className={styles.metaItem} />
      </div>
    </div>
  </div>
);

const ListCardSkeleton = () => (
  <div className={styles.listCard}>
    <div className={joinClassNames(styles.line, styles.lineMid)} />
    <div className={joinClassNames(styles.line, styles.lineShort)} />
  </div>
);

export { MovieCardSkeleton, MovieDetailsSkeleton, ListCardSkeleton };
