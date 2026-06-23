import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import styles from "./styles.module.scss";

import { checkIsNumberString } from "@/common/utils/check-is-number-string.util";
import { Alert } from "@/components/ui/Alert";
import { MovieCard } from "@/features/movies/components/MovieCard";
import { MOVIE_CATEGORIES } from "@/features/movies/constants/movie-categories.constant";
import { getMoviesByCategory } from "@/features/movies/services";
import type { MovieCategoryType } from "@/features/movies/types/movie-category.type";
import { ScrollToTop } from "@/components/ScrollToTop";
import { UrlPagination } from "@/components/UrlPagination";

const CATEGORY_I18N_KEY_MAP = {
  popular: "popular",
  now_playing: "nowPlaying",
  top_rated: "topRated",
  upcoming: "upcoming",
} as const;

export default async function MovieCategoryPage({
  params,
  searchParams,
}: PageProps<"/[locale]/movies/[category]">) {
  const { category } = (await params) as { category: MovieCategoryType };
  const { page } = await searchParams;

  if (!new Set(MOVIE_CATEGORIES).has(category)) {
    notFound();
  }

  const currentPage =
    typeof page === "string" && checkIsNumberString(page) ? +page : 1;

  const t = await getTranslations("Home");
  const categoryTitle = t(CATEGORY_I18N_KEY_MAP[category]);

  const response = await getMoviesByCategory(category, {
    page: currentPage,
  });

  if (response.status === "error") {
    return (
      <Alert
        content={t("categoryFetchError", { category: categoryTitle })}
        variant="error"
      />
    );
  }

  if (response.data.results.length === 0) {
    return (
      <Alert
        content={t("categoryNoResults", { category: categoryTitle })}
        variant="info"
      />
    );
  }

  return (
    <div className={styles.page}>
      <ScrollToTop />
      <h1 className={styles.title}>{categoryTitle}</h1>
      <div className={styles.grid}>
        {response.data.results.map((movie) => (
          <MovieCard key={movie.tmdbId} variant="public" {...movie} />
        ))}
      </div>
      <UrlPagination totalPages={response.data.totalPages} />
    </div>
  );
}
