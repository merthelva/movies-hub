import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import styles from "./styles.module.scss";
import { TMDB_IMAGE_BASE_URL } from "@/common/constants/tmdb-image-base-url.constant";
import { Alert } from "@/components/ui/Alert";
import { getMovieDetails } from "@/features/movies/services";
import { formatRuntime } from "@/features/movies/utils/format-runtime.util";
import { formatCurrency } from "@/features/movies/utils/format-currency.util";
import { ActionButtons } from "@/features/movies/components/ActionButtons";
import { Language } from "@/common/constants/language.constant";
import type { LocaleType } from "@/common/types/locale.type";

export default async function DetailsPage({
  params,
}: PageProps<"/[locale]/movie/[id]">) {
  const { id, locale } = await params;
  const t = await getTranslations("Movie");

  if (isNaN(Number(id))) {
    notFound();
  }

  const response = await getMovieDetails(+id, Language[locale as LocaleType]);

  if (response.status === "error") {
    return <Alert content={t("fetchDetailsError")} variant="error" />;
  }

  const movie = response.data;
  const [year] = movie.releaseDate.split("-");

  const financialsSection = [
    {
      id: t("budget"),
      value: movie.budget,
    },
    {
      id: t("revenue"),
      value: movie.revenue,
    },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.posterWrapper}>
        <Image
          src={`${TMDB_IMAGE_BASE_URL}${movie.posterPath}`}
          alt={movie.title}
          fill
          className={styles.poster}
          sizes="(max-width: 768px) 100vw, 280px"
          priority
        />
        <ActionButtons movieId={+id} />
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <div className={styles.meta}>
          <span className={styles.rating}>
            ★ {movie.voteAverage.toFixed(1)}
          </span>
          <span className={styles.voteCount}>
            ({movie.voteCount.toLocaleString()} {t("votes")})
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.year}>{year}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.runtime}>{formatRuntime(movie.runtime)}</span>
        </div>
        <div className={styles.genres}>
          {movie.genres.map((genre) => (
            <span key={genre} className={styles.genre}>
              {genre}
            </span>
          ))}
        </div>
        <p className={styles.overview}>{movie.overview}</p>
        <div className={styles.financials}>
          {financialsSection.map(({ id, value }) => (
            <div key={id} className={styles.financialItem}>
              <span className={styles.financialLabel}>{id}</span>
              <span className={styles.financialValue}>
                {formatCurrency(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
