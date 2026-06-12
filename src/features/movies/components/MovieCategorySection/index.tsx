import { NavLink } from "@/components/ui/NavLink";
import { MovieCard } from "@/features/movies/components/MovieCard";
import type { MovieCategorySectionPropsType } from "./component.type";
import styles from "./styles.module.scss";

const MovieCategorySection = ({
  title,
  movies,
  viewMoreHref,
  viewMoreLabel,
}: MovieCategorySectionPropsType) => {
  return (
    <section className={styles.section}>
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
          <MovieCard key={movie.tmdbId} {...movie} />
        ))}
      </div>
    </section>
  );
};

export { MovieCategorySection };
