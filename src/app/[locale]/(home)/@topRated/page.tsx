import type { LanguageType } from "@/common/types/language.type";
import { MovieCategoryPageFactory } from "@/features/movies/components/MovieCategoryPageFactory";

export default async function TopRatedPage({
  params,
  searchParams,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  const { query } = await searchParams;
  return (
    <MovieCategoryPageFactory
      category="top_rated"
      lang={locale as LanguageType}
      query={String(query ?? "")}
    />
  );
}
