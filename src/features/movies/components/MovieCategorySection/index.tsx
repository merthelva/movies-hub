import type { MovieCategorySectionPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { NavLink } from "@/components/ui/NavLink";
import { MovieCard } from "@/features/movies/components/MovieCard";

const MovieCategorySection = ({
  title,
  movies,
  viewMoreHref,
  viewMoreLabel,
}: MovieCategorySectionPropsType) => {
  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <NavLink
          href={viewMoreHref}
          label={viewMoreLabel}
          className={styles.viewMore}
        />
      </div>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.tmdbId} variant="public" {...movie} />
        ))}
      </div>
    </div>
  );
};

export { MovieCategorySection };
