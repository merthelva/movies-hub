import { MovieCategorySectionSkeleton } from "@/components/ui/Skeleton";

import styles from "../styles.module.scss";

export default function PopularLoading() {
  return (
    <div className={styles.section}>
      <MovieCategorySectionSkeleton />
    </div>
  );
}
