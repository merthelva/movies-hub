import { MovieCategorySectionSkeleton } from "@/components/ui/Skeleton";

import styles from "../styles.module.scss";

export default function TopRatedLoading() {
  return (
    <div className={styles.section}>
      <MovieCategorySectionSkeleton />
    </div>
  );
}
