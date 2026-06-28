import { getTranslations } from "next-intl/server";

import type { MovieCategoryPageFactoryPropsType } from "./component.type";
import { categoryToTitleMap } from "./categoryToTitleMap.constant";

import { Alert } from "@/components/ui/Alert";
import { MovieCategorySection } from "@/features/movies/components/MovieCategorySection";
import { getMoviesByCategory } from "@/features/movies/services";
import { convertFromSnakeCase } from "@/common/utils/convert-from-snake-case.util";

export async function MovieCategoryPageFactory({
  category,
  query,
  lang,
}: MovieCategoryPageFactoryPropsType) {
  if (typeof query === "string" && query.trim()) {
    return null;
  }

  // For `getMoviesByCategory`, `page` query param is set to 1 by default.
  // Only the first 20 movies are fetched from the service. So, `response.data.results.length = 20`
  const response = await getMoviesByCategory(category);
  const t = await getTranslations("Home");

  if (response.status === "error") {
    return (
      <Alert
        content={
          response.message ||
          `An error occurred while fetching movies for "${convertFromSnakeCase(category, lang)}" category`
        }
        variant="error"
      />
    );
  }

  if (response.data.results.length === 0) {
    return (
      <Alert
        content={`No movie is found for "${convertFromSnakeCase(category, lang)}" category.`}
        variant="info"
      />
    );
  }

  return (
    <MovieCategorySection
      title={t(categoryToTitleMap[category])}
      movies={response.data.results}
      viewMoreHref={`/movies/${category}`}
      viewMoreLabel={t("viewMore")}
    />
  );
}
