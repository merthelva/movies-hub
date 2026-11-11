import { MovieCategoryPageFactory } from "@/features/movies/components/MovieCategoryPageFactory";

export default async function TopRatedPage({
  searchParams,
}: PageProps<"/[locale]">) {
  const { query } = await searchParams;
  return (
    <MovieCategoryPageFactory
      category="top_rated"
      query={String(query ?? "")}
    />
  );
}
