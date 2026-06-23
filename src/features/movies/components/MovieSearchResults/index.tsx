import { getTranslations } from "next-intl/server";

import styles from "./styles.module.scss";
import type { MovieSearchResultsPropsType } from "./component.type";

import { Alert } from "@/components/ui/Alert";
import { UrlPagination } from "@/components/UrlPagination";
import { MovieCard } from "@/features/movies/components/MovieCard";
import { searchMovies } from "@/features/movies/services";

export async function MovieSearchResults({
  page,
  query,
}: MovieSearchResultsPropsType) {
  const t = await getTranslations("Home");

  let searchedMoviesResponse: Awaited<ReturnType<typeof searchMovies>> | null =
    null;
  if (query) {
    searchedMoviesResponse = await searchMovies(query, {
      page: page,
    });
  }

  const renderSearchMovieResults = () => {
    if (!searchedMoviesResponse) {
      return null;
    }

    if (searchedMoviesResponse?.status === "error") {
      return <Alert content={t("searchError")} variant="error" />;
    }

    if (searchedMoviesResponse.data.results.length === 0) {
      return <Alert content={t("noSearchResults")} variant="info" />;
    }

    return (
      <>
        <div className={styles.searchResultsGrid}>
          {searchedMoviesResponse.data.results.map((movie) => (
            <MovieCard key={movie.tmdbId} variant="public" {...movie} />
          ))}
        </div>
        <UrlPagination totalPages={searchedMoviesResponse.data.totalPages} />
      </>
    );
  };

  return (
    <section>
      <h2 className={styles.searchResultsTitle}>{t("searchResults")}</h2>
      {renderSearchMovieResults()}
    </section>
  );
}
