import { getTranslations } from "next-intl/server";

import type { MovieCategoryPageFactoryPropsType } from "./component.type";
import { categoryToTitleMap } from "./categoryToTitleMap.constant";

import { Alert } from "@/components/ui/Alert";
import { MovieCategorySection } from "@/features/movies/components/MovieCategorySection";
import { getMoviesByCategory } from "@/features/movies/services";

export async function MovieCategoryPageFactory({
  category,
  query,
}: MovieCategoryPageFactoryPropsType) {
  if (typeof query === "string" && query.trim()) {
    return null;
  }

  // For `getMoviesByCategory`, `page` query param is set to 1 by default.
  // Only the first 20 movies are fetched from the service. So, `response.data.results.length = 20`
  const response = await getMoviesByCategory(category);
  const t = await getTranslations("Home");
  const categoryTitle = t(categoryToTitleMap[category]);

  if (response.status === "error") {
    return (
      <Alert
        content={
          response.message ||
          t("categoryFetchError", { category: categoryTitle })
        }
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
    <MovieCategorySection
      title={categoryTitle}
      movies={response.data.results}
      viewMoreHref={`/movies/${category}`}
      viewMoreLabel={t("viewMore")}
    />
  );
}
