import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/common/constants/tmdb-image-base-url.constant";
import { NavLink } from "@/components/ui/NavLink";
import type { MovieCardPropsType } from "./component.type";
import { ActionButtons } from "../ActionButtons";
import styles from "./styles.module.scss";

const MovieCard = ({
  tmdbId,
  title,
  posterPath,
  releaseDate,
  voteAverage,
}: MovieCardPropsType) => {
  const [year] = releaseDate.split("-");
  const movieHref = `/movie/${tmdbId}`;

  return (
    <article className={styles.card}>
      <div className={styles.posterContainer}>
        <NavLink href={movieHref} label={title} className={styles.posterLink}>
          <div className={styles.posterWrapper}>
            <Image
              src={`${TMDB_IMAGE_BASE_URL}${posterPath}`}
              alt={title}
              fill
              className={styles.poster}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
            />
          </div>
        </NavLink>
        <ActionButtons movieId={tmdbId} />
      </div>
      <div className={styles.body}>
        <NavLink href={movieHref} label={title} className={styles.titleLink} />
        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
          <span className={styles.rating}>★ {voteAverage.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
};

export { MovieCard };
