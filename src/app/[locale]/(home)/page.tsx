import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { MovieCategorySectionSkeleton } from "@/components/ui/Skeleton";
import { MovieCard } from "@/features/movies/components/MovieCard";
import { MovieSearchInput } from "@/features/movies/components/MovieSearchInput";
import { searchMovies } from "@/features/movies/services";
import styles from "./styles.module.scss";
import { Alert } from "@/components/ui/Alert";
import { UrlPagination } from "@/components/UrlPagination";
import { checkIsNumberString } from "@/common/utils/check-is-number-string.util";

export default async function HomePage({
  searchParams,
}: PageProps<"/[locale]">) {
  const { query, page } = await searchParams;
  const searchQuery = typeof query === "string" ? query.trim() : "";
  const currentPage =
    typeof page === "string" && checkIsNumberString(page) ? +page : 1;
  const t = await getTranslations("Home");
  let searchedMoviesResponse: Awaited<ReturnType<typeof searchMovies>> | null =
    null;
  if (searchQuery) {
    searchedMoviesResponse = await searchMovies(searchQuery, {
      page: currentPage,
    });
  }

  const renderSearchMovieResults = () => {
    if (!searchedMoviesResponse) {
      return null;
    }

    if (searchedMoviesResponse?.status === "error") {
      return (
        <Alert
          content="An error occurred while searching for movies. Please try again later."
          variant="error"
        />
      );
    }

    if (searchedMoviesResponse.data.results.length === 0) {
      return (
        <Alert
          content="No movie is found with this search input."
          variant="info"
        />
      );
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
    <>
      <MovieSearchInput />
      <Suspense fallback={<MovieCategorySectionSkeleton />}>
        {searchedMoviesResponse && (
          <section>
            <h2 className={styles.searchResultsTitle}>{t("searchResults")}</h2>
            {renderSearchMovieResults()}
          </section>
        )}
      </Suspense>
    </>
  );
}
