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

const SKELETON_CARD_IDS = [1, 2, 3, 4, 5] as const;
const USER_LIST_SKELETON_IDS = [1, 2, 3, 4, 5, 6] as const;

const UserListGridSkeleton = () => (
  <div className={styles.userListPage}>
    <div className={styles.userListHeader}>
      <div className={styles.userListTitle} />
      <div className={styles.userListCreateBtn} />
    </div>
    <div className={styles.userListGrid}>
      {USER_LIST_SKELETON_IDS.map((id) => (
        <ListCardSkeleton key={id} />
      ))}
    </div>
  </div>
);

const MovieCategorySectionSkeleton = () => (
  <section>
    <div className={styles.categorySectionHeader}>
      <div className={styles.categorySectionTitle} />
    </div>
    <div className={styles.categorySectionGrid}>
      {SKELETON_CARD_IDS.map((id) => (
        <MovieCardSkeleton key={id} />
      ))}
    </div>
  </section>
);

const TrailerSkeleton = () => (
  <div className={styles.trailerSection}>
    <div className={joinClassNames(styles.line, styles.lineMid)} />
    <div className={styles.trailerEmbed} />
  </div>
);

const CAST_SKELETON_IDS = [1, 2, 3, 4, 5, 6] as const;

const MovieStarSkeleton = () => (
  <div className={styles.movieStar}>
    <div className={styles.starAvatar} />
    <div className={joinClassNames(styles.line, styles.lineMid)} />
    <div className={joinClassNames(styles.line, styles.lineShort)} />
  </div>
);

const CastSectionSkeleton = () => (
  <div className={styles.castSection}>
    {CAST_SKELETON_IDS.map((id) => (
      <MovieStarSkeleton key={id} />
    ))}
  </div>
);

export {
  MovieCardSkeleton,
  MovieCategorySectionSkeleton,
  MovieDetailsSkeleton,
  TrailerSkeleton,
  MovieStarSkeleton,
  CastSectionSkeleton,
  ListCardSkeleton,
  UserListGridSkeleton,
};
