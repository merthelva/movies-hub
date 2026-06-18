import { getTranslations } from "next-intl/server";

import { Alert } from "@/components/ui/Alert";
import { MovieCategorySection } from "@/features/movies/components/MovieCategorySection";
import { getMoviesByCategory } from "@/features/movies/services";

export default async function TopRatedPage({
  searchParams,
}: PageProps<"/[locale]">) {
  const { query } = await searchParams;
  if (typeof query === "string" && query.trim()) return null;

  // For `getMoviesByCategory`, `page` query param is set to 1 by default.
  // Only the first 20 movies are fetched from the service. So, `response.data.results.length = 20`
  const response = await getMoviesByCategory("top_rated");
  const t = await getTranslations("Home");

  if (response.status === "error") {
    return (
      <Alert
        content='An error occurred while fetching movies for "Top Rated" category'
        variant="error"
      />
    );
  }

  if (response.data.results.length === 0) {
    return (
      <Alert
        content='No movie is found for "Top Rated" category.'
        variant="info"
      />
    );
  }

  return (
    <MovieCategorySection
      title={t("topRated")}
      movies={response.data.results}
      viewMoreHref="/movies/top_rated"
      viewMoreLabel={t("viewMore")}
    />
  );
}
